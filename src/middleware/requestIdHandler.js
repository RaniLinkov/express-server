import utils from "../utils.js";

const handler = (req, res, next) => {
    const requestId = utils.uuid.v4();

    req.requestId = requestId;
    res.set("X-Request-Id", requestId);

    req.extendLogger({requestId});

    next();
}

export default handler;
