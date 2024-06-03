"use strict";

import {REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE_MAX_AGE} from "../constants.js";

const handler = (req, res, next) => {
    res.items = (items = []) =>
        res.json({
            items: Array.isArray(items) ? items : [items],
        });

    res.refreshTokenCookie = (token) =>
        res.cookie(REFRESH_TOKEN_COOKIE, token, {
            maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
            httpOnly: true,
            secure: true
        });

    return next();
};

export default handler;
