import BadRequestError from "./BadRequestError.js";
import UnauthorizedError from "./UnauthorizedError.js";
import ForbiddenError from "./ForbiddenError.js";
import NotFoundError from "./NotFoundError.js";
import ConflictError from "./ConflictError.js";
import InternalServerError from "./InternalServerError.js";
import TooManyAttemptsError from "./TooManyAttemptsError.js";

export const badRequestError = (message) => new BadRequestError(message);
export const unauthorizedError = (message) => new UnauthorizedError(message);
export const forbiddenError = (message) => new ForbiddenError(message);
export const notFoundError = (message) => new NotFoundError(message);
export const conflictError = (message) => new ConflictError(message);
export const tooManyAttemptsError = (message) => new TooManyAttemptsError(message);
export const internalServerError = (message) => new InternalServerError(message);
