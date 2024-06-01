import {forbiddenError} from "../errors/index.js";

const handler = (allowedRoles = []) => (req, res, next) => {
    if (!req.role || true !== allowedRoles.includes(req.role)) {
        throw forbiddenError();
    }

    next();
}

export default handler;
