import BaseError from "./BaseError.js";
import {ERROR_CODE, ERROR_MESSAGE} from "../constants.js";

class UnauthorizedError extends BaseError {
    constructor(message = ERROR_MESSAGE.UNAUTHORIZED) {
        super(message, ERROR_CODE.UNAUTHORIZED, true);
    }
}

export default UnauthorizedError;
