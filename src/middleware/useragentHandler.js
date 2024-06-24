"use strict";

const handler = async (req, res, next) => {
    req.useragent = {
        browser: req.useragent.browser,
        version: req.useragent.version,
        os: req.useragent.os,
        platform: req.useragent.platform,
        source: req.useragent.source,
    }

    next();
}

export default handler;
