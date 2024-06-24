"use strict";

import utils from "../../utils.js";
import db from "../../db/index.js";

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
        const filter = {};
        if (userId !== undefined) filter.userId = userId;
        if (workspaceId !== undefined) filter.workspaceId = workspaceId;

        return db.userWorkspaceMapping.read(filter);
    },
    update: (userId, workspaceId, data) => {
        const filter = {};
        if (userId !== undefined) filter.userId = userId;
        if (workspaceId !== undefined) filter.workspaceId = workspaceId;

        return db.userWorkspaceMapping.update(filter, data);
    },
    delete: (userId, workspaceId) => {
        const filter = {};
        if (userId !== undefined) filter.userId = userId;
        if (workspaceId !== undefined) filter.workspaceId = workspaceId;

        return db.userWorkspaceMapping.delete(filter);
    },
    readUserWorkspaces: (userId, workspaceId) => {
        const filter = {};
        if (userId !== undefined) filter.userId = userId;
        if (workspaceId !== undefined) filter.workspaceId = workspaceId;

        return db.userWorkspaceMapping.readUserWorkspaces(filter);
    },
    readWorkspaceUsers: (workspaceId, userId) => {
        const filter = {};
        if (workspaceId !== undefined) filter.workspaceId = workspaceId;
        if (userId !== undefined) filter.userId = userId;

        return db.userWorkspaceMapping.readWorkspaceUsers(filter);
    }
}
