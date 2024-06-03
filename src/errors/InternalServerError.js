"use strict";

import BaseError from "./BaseError.js";
import {ERROR_CODE, ERROR_MESSAGE} from "../constants.js";

class InternalServerError extends BaseError {
    constructor(message = ERROR_MESSAGE.INTERNAL_SERVER_ERROR) {
        super(message, ERROR_CODE.INTERNAL_SERVER_ERROR, false);
    }
}

export default InternalServerError;
