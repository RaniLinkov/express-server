"use strict";

export const TABLES = {
    USERS: 'users',
    SESSIONS: 'sessions',
    DEVICES: 'devices',
    OTPS: 'otps',
    WORKSPACES: 'workspaces',
    USER_WORKSPACE_MAPPING: 'userWorkspaceMapping',
};

const USER_ID = 'userId';
const EMAIL = 'email';
const NAME = 'name';
const WORKSPACE_ID = 'workspaceId';
const CREATED_AT = 'createdAt';
const UPDATED_AT = 'updatedAt';
const EXPIRES_AT = 'expiresAt';

export const COLUMNS = {
    USERS: {
        USER_ID: `${TABLES.USERS}.${USER_ID}`,
        EMAIL: `${TABLES.USERS}.${EMAIL}`,
        NAME: `${TABLES.USERS}.${NAME}`,
        PASSWORD: `${TABLES.USERS}.password`,
        PASSWORD_FAILED_ATTEMPTS: `${TABLES.USERS}.passwordFailedAttempts`,
        VERIFIED: `${TABLES.USERS}.verified`,
        MFA_ENABLED: `${TABLES.USERS}.mfaEnabled`,
        MFA_SECRET: `${TABLES.USERS}.mfaSecret`,
        MFA_FAILED_ATTEMPTS: `${TABLES.USERS}.mfaFailedAttempts`,
        MFA_LOCKED_UNTIL: `${TABLES.USERS}.mfaLockedUntil`,
        CREATED_AT: `${TABLES.USERS}.${CREATED_AT}`,
        UPDATED_AT: `${TABLES.USERS}.${UPDATED_AT}`,
    },
    SESSIONS: {
        SESSION_ID: `${TABLES.SESSIONS}.sessionId`,
        USER_ID: `${TABLES.SESSIONS}.${USER_ID}`,
        EXPIRES_AT: `${TABLES.SESSIONS}.${EXPIRES_AT}`,
        CREATED_AT: `${TABLES.SESSIONS}.${CREATED_AT}`,
    },
    OTPS: {
        EMAIL: `${TABLES.OTPS}.${EMAIL}`,
        CODE: `${TABLES.OTPS}.code`,
        FAILED_ATTEMPTS: `${TABLES.OTPS}.failedAttempts`,
        PURPOSE: `${TABLES.OTPS}.purpose`,
        EXPIRES_AT: `${TABLES.OTPS}.${EXPIRES_AT}`,
        CREATED_AT: `${TABLES.OTPS}.${CREATED_AT}`,
    },
    WORKSPACES: {
        WORKSPACE_ID: `${TABLES.WORKSPACES}.${WORKSPACE_ID}`,
        NAME: `${TABLES.WORKSPACES}.${NAME}`,
        CREATED_AT: `${TABLES.WORKSPACES}.${CREATED_AT}`,
        UPDATED_AT: `${TABLES.WORKSPACES}.${UPDATED_AT}`,
    },
    USER_WORKSPACE_MAPPING: {
        USER_ID: `${TABLES.USER_WORKSPACE_MAPPING}.${USER_ID}`,
        WORKSPACE_ID: `${TABLES.USER_WORKSPACE_MAPPING}.${WORKSPACE_ID}`,
        ROLE: `${TABLES.USER_WORKSPACE_MAPPING}.role`,
        CREATED_AT: `${TABLES.USER_WORKSPACE_MAPPING}.${CREATED_AT}`,
        UPDATED_AT: `${TABLES.USER_WORKSPACE_MAPPING}.${UPDATED_AT}`,
    }
};
