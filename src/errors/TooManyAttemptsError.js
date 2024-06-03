"use strict";

import BaseError from "./BaseError.js";
import {ERROR_CODE, ERROR_MESSAGE} from "../constants.js";

class TooManyAttemptsError extends BaseError {
    constructor(message = ERROR_MESSAGE.TOO_MANY_ATTEMPTS) {
        super(message, ERROR_CODE.TOO_MANY_ATTEMPTS, true);
    }
}

export default TooManyAttemptsError;
