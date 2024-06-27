"use strict";

import utils from "../../utils.js";
import db from "../../db/index.js";

const createFilter = (userId, workspaceId) => {
    const filter = {};
    if (userId !== undefined) filter.userId = userId;
    if (workspaceId !== undefined) filter.workspaceId = workspaceId;

    return filter;
};

export default {
    create: async (userId, workspaceId, role) => {
        const data = {};

        const now = utils.time.now();

        data.userId = userId;
        data.workspaceId = workspaceId;
        data.role = role;
        data.createdAt = now;
        data.updatedAt = now;

        return db.userWorkspaceMapping.create(data);
    },
    read: (userId, workspaceId) => {
        const filter = createFilter(userId, workspaceId);

        return db.userWorkspaceMapping.read(filter);
    },
    update: (userId, workspaceId, data) => {
        const filter = createFilter(userId, workspaceId);

        return db.userWorkspaceMapping.update(filter, data);
    },
    delete: (userId, workspaceId) => {
        const filter = createFilter(userId, workspaceId);

        return db.userWorkspaceMapping.delete(filter);
    },
    readUserWorkspaces: (userId, workspaceId) => {
        const filter = createFilter(userId, workspaceId);

        return db.userWorkspaceMapping.readUserWorkspaces(filter);
    },
    readWorkspaceUsers: (workspaceId, userId) => {
        const filter = createFilter(workspaceId, userId);

        return db.userWorkspaceMapping.readWorkspaceUsers(filter);
    }
}
