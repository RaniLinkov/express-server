"use strict";

import {ERROR_CODE, ERROR_MESSAGE} from "../constants.js";

const handler = (err, req, res, _) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({message: err.message});
    } else {
        req.logger.error('Unexpected error:', err);
        res.status(ERROR_CODE.INTERNAL_SERVER_ERROR).json({message: ERROR_MESSAGE.SOMETHING_WENT_WRONG});
    }
}

export default handler;
