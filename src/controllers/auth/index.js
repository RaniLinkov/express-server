"use strict";

import requestValidator from "../../middleware/requestValidator.js";
import utils from "../../utils.js";
import services from "../../services/index.js";
import {REFRESH_TOKEN_COOKIE} from "../../constants.js";
import {badRequestError, conflictError, forbiddenError, unauthorizedError} from "../../errors/index.js";
import {ERROR_MESSAGE} from "../../errors/constants.js";

const findUserDeviceId = async (userId, useragent) => {
    const devices = await services.devices.read(userId);

    return devices.find(device => {
        return device.useragent.browser === useragent.browser &&
            device.useragent.version === useragent.version &&
            device.useragent.os === useragent.os &&
            device.useragent.platform === useragent.platform &&
            device.useragent.source === useragent.source;
    })?.deviceId;
};

const terminateUserSession = async (sessionId, userId, deviceId) => {
    const [session] = await services.sessions.read(sessionId, userId, deviceId);

    if (session) {
        await services.sessions.delete(session.sessionId);
        await services.sessions.blackList(session.sessionId);
    }
};

const handleUserSessionCreation = async (userId, deviceId) => {
    const [session] = await services.sessions.create(userId, deviceId);

    return {
        accessToken: await services.auth.accessToken.sign({userId, sessionId: session.sessionId}),
        refreshToken: await services.auth.refreshToken.sign({sessionId: session.sessionId}),
    };
};

const handleSuccessfulSignIn = async (userId, useragent, res) => {
    let deviceId = await findUserDeviceId(userId, useragent);

    if (!deviceId) {
        const [device] = await services.devices.create(userId, useragent);
        deviceId = device.deviceId;
    }

    await terminateUserSession(undefined, userId, deviceId);

    const {accessToken, refreshToken} = await handleUserSessionCreation(userId, deviceId);

    res.status(201).refreshToken.setCookie(refreshToken).items({accessToken});
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
                await handleSuccessfulSignIn(user.userId, req.useragent, res);
            }
        }
    },
    signOut: {
        handler: async (req, res) => {
            const deviceId = await findUserDeviceId(req.userId, req.useragent);

            await terminateUserSession(undefined, req.userId, deviceId);

            res.refreshToken.clearCookie().items();
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
                    throw unauthorizedError();
                }

                const [session] = await services.sessions.read(payload.sessionId);

                if (!session) {
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

                    await terminateUserSession(user.userId);

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

                await handleSuccessfulSignIn(user.userId, req.useragent, res);
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

                await terminateUserSession(session.sessionId);

                res.items();
            }
        }
    }
}
