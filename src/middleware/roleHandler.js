import {forbiddenError} from "../errors/index.js";

const handler = (allowedRoles = []) => (req, res, next) => {
    if (!req.role || allowedRoles.includes(req.role) !== true) {
        throw forbiddenError();
    }

    next();
}

export default handler;
