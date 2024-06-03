"use strict";

import BaseError from "./BaseError.js";
import {ERROR_CODE, ERROR_MESSAGE} from "./constants.js";

class ForbiddenError extends BaseError {
    constructor(message = ERROR_MESSAGE.FORBIDDEN) {
        super(message, ERROR_CODE.FORBIDDEN, true);
    }
}

export default ForbiddenError;
