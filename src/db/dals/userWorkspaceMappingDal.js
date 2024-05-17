import {initBaseDal} from './baseDal.js';
import {COLUMNS, TABLES} from "../constants.js";

export const initUserWorkspaceMappingDal = (knex) => {
    const baseDal = initBaseDal(knex, TABLES.USER_WORKSPACE_MAPPING);

    return {
        create: (data) => {
            return baseDal.create(data);
        },
        read: (filter) => {
            return baseDal.read(filter);
        },
        delete: (filter) => {
            return baseDal.delete(filter);
        },
        readUserWorkspaces: (filter) => {
            filter = {
                ...(filter.userId && {[COLUMNS.USER_WORKSPACE_MAPPING.USER_ID]: filter.userId}),
                ...(filter.workspaceId && {[COLUMNS.USER_WORKSPACE_MAPPING.WORKSPACE_ID]: filter.workspaceId})
            };

            return knex(TABLES.USER_WORKSPACE_MAPPING)
                .join(TABLES.WORKSPACES,
                    COLUMNS.USER_WORKSPACE_MAPPING.WORKSPACE_ID,
                    COLUMNS.WORKSPACES.WORKSPACE_ID)
                .select(COLUMNS.USER_WORKSPACE_MAPPING.ROLE,
                    COLUMNS.WORKSPACES.WORKSPACE_ID,
                    COLUMNS.WORKSPACES.NAME,
                    COLUMNS.WORKSPACES.CREATED_AT,
                    COLUMNS.WORKSPACES.UPDATED_AT)
                .where(filter);
        },
        readWorkspaceUsers: (filter) => {
            filter = {
                ...(filter.userId && {[COLUMNS.USER_WORKSPACE_MAPPING.USER_ID]: filter.userId}),
                ...(filter.workspaceId && {[COLUMNS.USER_WORKSPACE_MAPPING.WORKSPACE_ID]: filter.workspaceId})
            };

            return knex(TABLES.USER_WORKSPACE_MAPPING)
                .join(TABLES.USERS,
                    COLUMNS.USER_WORKSPACE_MAPPING.USER_ID,
                    COLUMNS.USERS.USER_ID)
                .select(COLUMNS.USER_WORKSPACE_MAPPING.ROLE,
                    COLUMNS.USERS.USER_ID,
                    COLUMNS.USERS.EMAIL,
                    COLUMNS.USERS.NAME)
                .where(filter);
        }
    }
}
