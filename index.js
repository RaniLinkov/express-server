"use strict";

import {createServer} from 'http';
import app from "./src/app.js";
import config from "./src/config/index.js";
import logger from "./src/logger/index.js";
import db from "./src/db/index.js";
import cache from "./src/cache/index.js";

const server = createServer(app);

//region Graceful shutdown
const gracefulShutdown = async (signal) => {
    try {
        logger.info(`${signal} received: shutting down the server.`);

        server.close(async (error) => {
            if (error) {
                logger.error('Failed to close the HTTP server:', error);
                process.exit(1);
            }

            logger.info('Server closed.');

            const errors = (await Promise.allSettled([
                db.disconnect().then(() => logger.info('Disconnected from database.')),
                cache.disconnect().then(() => logger.info('Disconnected from cache.'))
            ])).filter(result => result.status === 'rejected');

            if (errors.length > 0) {
                errors.forEach(error => logger.error('Error during shutdown:', error.reason));
                process.exit(1);
            }

            logger.info('Cleanup completed. Exiting now.');
            process.exit(0);
        });
    } catch (error) {
        logger.error('Error during shutdown:', error);
        process.exit(1);
    }
}

process.on('uncaughtException', async (error) => {
    logger.error(`Uncaught Exception: ${error.message}`, {stack: error.stack});
    await gracefulShutdown('UncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    logger.warn(`Unhandled Rejection at Promise: ${promise}, reason: ${reason}`);
    // TODO: Decide based on the application context whether to shut down or not
});

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
//endregion

// region Initialization
const initDb = () => {
    logger.info('Connecting to the database...');
    return db.connect().then(() => logger.info('Connected to the database.')).catch((err) => {
        logger.error(`Failed to connect to database: ${err}`);

        throw err;
    });
};

const initCache = () => {
    logger.info('Connecting to the cache...');
    return cache.connect().then(() => logger.info('Connected to the cache.')).catch((err) => {
        logger.error(`Failed to connect to cache: ${err}`);

        throw err;
    });
};
// endregion

(async () => {
    try {
        await Promise.all([
            initDb(),
            initCache()
        ]);

        server.listen(config.PORT, () => {
            logger.info(`Server is running on port: ${config.PORT}. pid: ${process.pid}.`);
        });
    } catch (error) {
        logger.error(`Failed to start the server: ${error}`);
        process.exit(1);
    }
})();
