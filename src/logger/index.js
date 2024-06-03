"use strict";

import {initLogger} from "./winston.js";
import config from "../config/index.js";

const logger = initLogger(config.NODE_ENV);

const info = (message) => logger.info(message);
const warn = (message) => logger.warn(message);
const error = (message) => logger.error(message);
const child = (options) => logger.child(options);

export default {
    info,
    warn,
    error,
    child
}
