import UnauthorizedError from "../errors/UnauthorizedError.js";
import services from "../services/index.js";
import {AUTHORIZATION_HEADER, ERROR_MESSAGE} from "../constants.js";

const handler = async (req, res, next) => {
    const authorizationHeader = req.headers[AUTHORIZATION_HEADER];

    const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];

    if (!accessToken) {
        throw new UnauthorizedError();
    }

    const {payload, expired} = await services.auth.mfa.accessToken.verify(accessToken);

    if (null === payload) {
        throw new UnauthorizedError(expired ? ERROR_MESSAGE.EXPIRED_TOKEN : ERROR_MESSAGE.INVALID_TOKEN);
    }

    req.userId = payload.userId;

    req.extendLogger({
        userId: payload.userId,
    });

    next();
};

export default handler;
