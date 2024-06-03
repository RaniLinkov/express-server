"use strict";

import BaseError from "./BaseError.js";
import {ERROR_CODE, ERROR_MESSAGE} from "./constants.js";

class NotFoundError extends BaseError {
    constructor(message = ERROR_MESSAGE.NOT_FOUND) {
        super(message, ERROR_CODE.NOT_FOUND, true);
    }
}

export default NotFoundError;
