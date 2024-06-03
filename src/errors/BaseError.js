"use strict";

import {EMPTY_STRING} from "../constants.js";

class BaseError extends Error {
    constructor(message, statusCode, isOperational = true, stack = EMPTY_STRING) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.stack = stack || new Error(message).stack;
    }
}

export default BaseError;
