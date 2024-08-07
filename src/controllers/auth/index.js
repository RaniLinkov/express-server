"use strict";

import requestValidator from "../../middleware/requestValidator.js";
import utils from "../../utils.js";
import services from "../../services/index.js";
import {EMPTY_STRING, REFRESH_TOKEN_COOKIE} from "../../constants.js";
import {badRequestError, conflictError, forbiddenError, unauthorizedError} from "../../errors/index.js";
import {ERROR_MESSAGE} from "../../errors/constants.js";

const terminateUserSessions = async (sessionId, userId) => {
    const [session] = await services.sessions.read(sessionId, userId);

    if (session) {
        await services.sessions.delete(session.sessionId);
        await services.sessions.blackList(session.sessionId);
    }
};

const handleUserSessionCreation = async (userId) => {
    const [session] = await services.sessions.create(userId);

    return {
        accessToken: await services.auth.accessToken.sign({userId, sessionId: session.sessionId}),
        refreshToken: await services.auth.refreshToken.sign({sessionId: session.sessionId}),
    };
};

const handleSuccessfulSignIn = async (user, req, res) => {
    await terminateUserSessions(undefined, user.userId);

    const {accessToken, refreshToken} = await handleUserSessionCreation(user.userId);

    res.status(201).setRefreshTokenCookie(refreshToken).items({accessToken});
};

export default {
    signUp: {
        validator: requestValidator({
            body: utils.joi.object({
                email: utils.joi.schemas.user.email.required(),
                password: utils.joi.schemas.user.password.required(),
                name: utils.joi.schemas.user.name.required(),
            }).required(),
        }),
        handler: async (req, res) => {
            const [user] = await services.users.read(undefined, req.body.email);

            if (user) {
                throw conflictError();
            }

            await services.users.create(req.body.email, req.body.password, req.body.name);

            res.status(201).items();
        }
    },
    signIn: {
        validator: requestValidator({
            body: utils.joi.object({
                email: utils.joi.schemas.user.email.required(),
                password: utils.joi.schemas.user.password.required(),
            }).required(),
        }),
        handler: async (req, res) => {
            const [user] = await services.users.read(undefined, req.body.email);

            if (!user) {
                throw badRequestError(ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD);
            }

            if (true !== user.verified) {
                throw forbiddenError(ERROR_MESSAGE.USER_NOT_VERIFIED);
            }

            await services.auth.password.verify(user, req.body.password);

            if (user.mfaEnabled === true) {
                res.items({
                    mfaAccessToken: await services.auth.mfa.accessToken.sign({userId: user.userId})
                });
            } else {
                await handleSuccessfulSignIn(user, req, res);
            }
        }
    },
    signOut: {
        handler: async (req, res) => {
            await terminateUserSessions(undefined, req.userId);

            res.setRefreshTokenCookie(EMPTY_STRING).items();
        }
    },
    token: {
        get: {
            handler: async (req, res) => {
                const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

                if (!refreshToken) {
                    throw badRequestError();
                }

                const {payload} = await services.auth.refreshToken.verify(refreshToken);

                if (null === payload || true === await services.sessions.isBlackListed(payload.sessionId)) {
                    res.setRefreshTokenCookie(EMPTY_STRING);
                    throw unauthorizedError();
                }

                const [session] = await services.sessions.read(payload.sessionId);

                if (!session) {
                    res.setRefreshTokenCookie(EMPTY_STRING);
                    throw badRequestError();
                }

                res.items({
                    accessToken: await services.auth.accessToken.sign({
                        userId: session.userId,
                        sessionId: payload.sessionId,
                        ...(payload.workspaceId && {workspaceId: payload.workspaceId}),
                    })
                });
            }
        }
    },
    email: {
        requestVerification: {
            validator: requestValidator({
                body: utils.joi.object({
                    email: utils.joi.schemas.user.email.required(),
                }).required(),
            }),
            handler: async (req, res) => {
                const [user] = await services.users.read(undefined, req.body.email);

                if (!user) {
                    throw badRequestError();
                }

                if (true !== user.verified) {
                    const code = await services.auth.email.generateVerificationCode(req.body.email);

                    services.auth.email.sendVerificationEmail(req.body.email, code).then(() => {
                        req.logger.info(`Email verification code sent to ${req.body.email}`);
                    }).catch((error) => {
                        req.logger.error(`Failed to send email verification code to ${req.body.email}: ${error.message}`);
                    });
                }

                res.items();
            }
        },
        verify: {
            validator: requestValidator({
                body: utils.joi.object({
                    email: utils.joi.schemas.user.email.required(),
                    code: utils.joi.schemas.otp.required(),
                }).required(),
            }),
            handler: async (req, res) => {
                const [user] = await services.users.read(undefined, req.body.email);

                if (!user) {
                    throw badRequestError();
                }

                if (true !== user.verified) {
                    await services.auth.email.verify(req.body.email, req.body.code);
                    await services.users.update(user.userId, {verified: true});

                }

                res.items();
            }
        }
    },
    password: {
        reset: {
            requestVerification: {
                validator: requestValidator({
                    body: utils.joi.object({
                        email: utils.joi.schemas.user.email.required()
                    }).required(),
                }),
                handler: async (req, res) => {
                    const [user] = await services.users.read(undefined, req.body.email);

                    if (!user) {
                        throw badRequestError();
                    }

                    const code = await services.auth.password.reset.generateVerificationCode(req.body.email);

                    services.auth.password.reset.sendVerificationEmail(req.body.email, code).then(() => {
                        req.logger.info(`Password reset code sent to ${req.body.email}`);
                    }).catch((error) => {
                        req.logger.error(`Failed to send password reset code to ${req.body.email}: ${error.message}`);
                    });

                    res.items();
                }
            },
            verify: {
                validator: requestValidator({
                    body: utils.joi.object({
                        email: utils.joi.schemas.user.email.required(),
                        code: utils.joi.schemas.otp.required(),
                        password: utils.joi.schemas.user.password.required(),
                    }).required(),
                }),
                handler: async (req, res) => {
                    const [user] = await services.users.read(undefined, req.body.email);

                    if (!user) {
                        throw badRequestError();
                    }

                    await services.auth.password.reset.verify(req.body.email, req.body.code);

                    await services.users.update(user.userId, {passwordFailedAttempts: 0, password: req.body.password});

                    await terminateUserSessions(undefined, user.userId);

                    res.items();
                }
            }
        }
    },
    mfa: {
        verify: {
            validator: requestValidator({
                body: utils.joi.object({
                    code: utils.joi.schemas.otp.required(),
                }).required(),
            }),
            handler: async (req, res) => {
                const [user] = await services.users.read(req.userId, undefined);

                if (!user) {
                    throw badRequestError();
                }

                if (true !== user.verified) {
                    throw forbiddenError(ERROR_MESSAGE.USER_NOT_VERIFIED);
                }

                if (true !== user.mfaEnabled) {
                    throw badRequestError(ERROR_MESSAGE.MFA_NOT_ENABLED);
                }

                await services.auth.mfa.code.verify(user, req.body.code);

                await handleSuccessfulSignIn(user, req, res);
            }
        }
    },
    sessions: {
        get: {
            handler: async (req, res) => {
                const sessions = await services.sessions.read(undefined, req.userId);

                res.items(sessions);
            }
        },
        delete: {
            validator: requestValidator({
                params: utils.joi.object({
                    sessionId: utils.joi.schemas.session.sessionId.required(),
                }).required(),
            }),
            handler: async (req, res) => {
                const [session] = await services.sessions.read(req.params.sessionId);

                if (!session) {
                    throw badRequestError();
                }

                if (session.sessionId !== req.sessionId) {
                    throw forbiddenError();
                }

                await terminateUserSessions(session.sessionId);

                res.items();
            }
        }
    }
}
