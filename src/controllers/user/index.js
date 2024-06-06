"use strict";

import services from "../../services/index.js";
import requestValidator from "../../middleware/requestValidator.js";
import utils from "../../utils.js";
import {badRequestError} from "../../errors/index.js";
import {ERROR_MESSAGE} from "../../errors/constants.js";

export default {
    get: {
        handler: async (req, res) => {
            const [user] = await services.users.read(req.userId, undefined);

            if (!user) {
                throw badRequestError();
            }

            return res.items({
                userId: user.userId,
                email: user.email,
                name: user.name
            });
        }
    },
    put: {
        validator: requestValidator({
            body: utils.joi.object({
                name: utils.joi.schemas.user.name
            }).required(),
        }),
        handler: async (req, res) => {
            if (!(await services.users.read(req.userId, undefined))) {
                throw badRequestError();
            }

            const [user] = await services.users.update(req.userId, {name: req.body.name});

            return res.items({
                userId: user.userId,
                email: user.email,
                name: user.name
            });
        }
    },
    password: {
        update: {
            validator: requestValidator({
                body: utils.joi.object({
                    currentPassword: utils.joi.schemas.user.password.required(),
                    newPassword: utils.joi.schemas.user.password.required()
                }).required(),
            }),
            handler: async (req, res) => {
                const [user] = await services.users.read(req.userId, undefined);

                if (!user) {
                    throw badRequestError();
                }

                await services.auth.password.verify(user, req.body.currentPassword);

                await services.users.update(req.userId, {password: req.body.newPassword, passwordFailedAttempts: 0});

                res.items();
            }
        }
    },
    mfa: {
        setup: {
            handler: async (req, res) => {
                const {mfaSecret, dataUrl} = await services.auth.mfa.setup.generateParams(req.userId);

                await services.users.update(req.userId, {mfaSecret});

                res.items({mfaSecret, dataUrl});
            }
        },
        enable: {
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

                if (user.mfaEnabled) {
                    throw badRequestError(ERROR_MESSAGE.ALREADY_ENABLED);
                }

                await services.auth.mfa.code.verify(user, req.body.code);

                await services.users.update(req.userId, {mfaEnabled: true, mfaFailedAttempts: 0});

                res.items();
            }
        },
        disable: {
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

                if (true !== user.mfaEnabled) {
                    throw badRequestError(ERROR_MESSAGE.MFA_NOT_ENABLED);
                }

                await services.auth.mfa.code.verify(user, req.body.code);

                await services.users.update(req.userId, {mfaEnabled: false, mfaSecret: null});

                res.items();
            }
        }
    }
}
