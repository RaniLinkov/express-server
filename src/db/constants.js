export const TABLES = {
    USERS: 'users',
    SESSIONS: 'sessions',
    OTPS: 'otps',
    WORKSPACES: 'workspaces',
    USER_WORKSPACE_MAPPING: 'userWorkspaceMapping',
};

export const COLUMNS = {
    USERS: {
        USER_ID: `${TABLES.USERS}.userId`,
        EMAIL: `${TABLES.USERS}.email`,
        NAME: `${TABLES.USERS}.name`,
        PASSWORD: `${TABLES.USERS}.password`,
        PASSWORD_FAILED_ATTEMPTS: `${TABLES.USERS}.passwordFailedAttempts`,
        VERIFIED: `${TABLES.USERS}.verified`,
        MFA_ENABLED: `${TABLES.USERS}.mfaEnabled`,
        MFA_SECRET: `${TABLES.USERS}.mfaSecret`,
        MFA_FAILED_ATTEMPTS: `${TABLES.USERS}.mfaFailedAttempts`,
        MFA_LOCKED_UNTIL: `${TABLES.USERS}.mfaLockedUntil`,
        CREATED_AT: `${TABLES.USERS}.createdAt`,
        UPDATED_AT: `${TABLES.USERS}.updatedAt`,
    },
    SESSIONS: {
        SESSION_ID: `${TABLES.SESSIONS}.sessionId`,
        USER_ID: `${TABLES.SESSIONS}.userId`,
        EXPIRES_AT: `${TABLES.SESSIONS}.expiresAt`,
        CREATED_AT: `${TABLES.SESSIONS}.createdAt`,
    },
    OTPS: {
        EMAIL: `${TABLES.OTPS}.email`,
        CODE: `${TABLES.OTPS}.code`,
        FAILED_ATTEMPTS: `${TABLES.OTPS}.failedAttempts`,
        PURPOSE: `${TABLES.OTPS}.purpose`,
        EXPIRES_AT: `${TABLES.OTPS}.expiresAt`,
        CREATED_AT: `${TABLES.OTPS}.createdAt`,
    },
    WORKSPACES: {
        WORKSPACE_ID: `${TABLES.WORKSPACES}.workspaceId`,
        NAME: `${TABLES.WORKSPACES}.name`,
        CREATED_AT: `${TABLES.WORKSPACES}.createdAt`,
        UPDATED_AT: `${TABLES.WORKSPACES}.updatedAt`,
    },
    USER_WORKSPACE_MAPPING: {
        USER_ID: `${TABLES.USER_WORKSPACE_MAPPING}.userId`,
        WORKSPACE_ID: `${TABLES.USER_WORKSPACE_MAPPING}.workspaceId`,
        ROLE: `${TABLES.USER_WORKSPACE_MAPPING}.role`,
        CREATED_AT: `${TABLES.USER_WORKSPACE_MAPPING}.createdAt`,
        UPDATED_AT: `${TABLES.USER_WORKSPACE_MAPPING}.updatedAt`,
    }
};
