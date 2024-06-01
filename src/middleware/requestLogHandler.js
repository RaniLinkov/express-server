import logger from "../logger/index.js";

const handler = (req, res, next) => {
    const {method, originalUrl} = req;

    req.logger = logger;

    req.extendLogger = (options) => {
        req.logger = req.logger.child(options);
    };

    if (method !== "OPTIONS") {
        req.logger.info(`Start: ${method} to ${originalUrl}`);

        res.on("finish", () => {
            req.logger.info(`End: ${method} to ${originalUrl} with status ${res.statusCode}`);
        });
    }

    next();
};

export default handler;
