"use strict";

import BaseError from "./BaseError.js";
import {ERROR_CODE, ERROR_MESSAGE} from "../constants.js";

class BadRequestError extends BaseError {
    constructor(message = ERROR_MESSAGE.BAD_REQUEST) {
        super(message, ERROR_CODE.BAD_REQUEST, true);
    }
}

export default BadRequestError;
