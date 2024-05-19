export const TRUE_STRING = 'true';

export const EMPTY_STRING = '';

export const AUTHORIZATION_HEADER = 'authorization';

export const USER_ROLE = {
    ADMIN: 'admin',
    EDITOR: 'editor',
    VIEWER: 'viewer'
};

export const ERROR_CODE = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_ATTEMPTS: 429,
    INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGE = {
    BAD_REQUEST: 'Bad request.',
    UNAUTHORIZED: 'Unauthorized.',
    FORBIDDEN: 'Forbidden.',
    NOT_FOUND: 'Not found.',
    CONFLICT: 'Conflict.',
    TOO_MANY_ATTEMPTS: 'Too many attempts.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    SOMETHING_WENT_WRONG: 'Something went wrong.',
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password.',
    EMAIL_ALREADY_EXISTS: 'Email already exists.',
    INVALID_TOKEN: 'Invalid token.',
    EXPIRED_TOKEN: 'expired token.',
    USER_NOT_VERIFIED: 'User not verified.',
    MFA_NOT_ENABLED: 'MFA not enabled.',
    INVALID_MFA_TOKEN: 'Invalid MFA token.',
    INVALID_OTP: 'Invalid OTP.',
    TRY_AGAIN_LATER: 'Please try again later.',
};
