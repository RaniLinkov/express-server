import BadRequestError from "./BadRequestError.js";
import UnauthorizedError from "./UnauthorizedError.js";
import ForbiddenError from "./ForbiddenError.js";
import NotFoundError from "./NotFoundError.js";
import ConflictError from "./ConflictError.js";
import InternalServerError from "./InternalServerError.js";
import TooManyAttemptsError from "./TooManyAttemptsError.js";

export const badRequestError = () => new BadRequestError();
export const unauthorizedError = () => new UnauthorizedError();
export const forbiddenError = () => new ForbiddenError();
export const notFoundError = () => new NotFoundError();
export const conflictError = () => new ConflictError();
export const tooManyAttemptsError = () => new TooManyAttemptsError();
export const internalServerError = () => new InternalServerError();
