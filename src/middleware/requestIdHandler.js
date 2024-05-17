import {randomUUID} from "crypto";

const handler = (req, res, next) => {
    const requestId = randomUUID();

    req.requestId = requestId;
    res.set("X-Request-Id", requestId);

    req.extendLogger({requestId});

    next();
}

export default handler;
