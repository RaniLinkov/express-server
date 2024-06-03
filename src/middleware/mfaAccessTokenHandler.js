"use strict";

import services from "../services/index.js";
import {AUTHORIZATION_HEADER} from "../constants.js";
import {unauthorizedError} from "../errors/index.js";
import {ERROR_MESSAGE} from "../errors/constants.js";

const handler = async (req, res, next) => {
    const authorizationHeader = req.headers[AUTHORIZATION_HEADER];

    const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];

    if (!accessToken) {
        throw unauthorizedError();
    }

    const {payload, expired} = await services.auth.mfa.accessToken.verify(accessToken);

    if (null === payload) {
        throw unauthorizedError(expired ? ERROR_MESSAGE.EXPIRED_TOKEN : ERROR_MESSAGE.INVALID_TOKEN);
    }

    req.userId = payload.userId;

    req.extendLogger({
        userId: payload.userId,
    });

    next();
};

export default handler;
