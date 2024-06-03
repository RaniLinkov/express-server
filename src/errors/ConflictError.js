"use strict";

import BaseError from "./BaseError.js";
import {ERROR_CODE, ERROR_MESSAGE} from "../constants.js";

class ConflictError extends BaseError {
    constructor(message = ERROR_MESSAGE.CONFLICT) {
        super(message, ERROR_CODE.CONFLICT, true);
    }
}

export default ConflictError;
