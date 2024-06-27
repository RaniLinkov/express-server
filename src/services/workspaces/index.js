"use strict";

import utils from "../../utils.js";
import db from "../../db/index.js";

const createFilter = (workspaceId) => {
    const filter = {};
    if (workspaceId !== undefined) filter.workspaceId = workspaceId;

    return filter;
};

export default {
    create: async (name) => {
        const data = {};

        const now = utils.time.now();

        data.name = name;
        data.workspaceId = utils.uuid.v4();
        data.createdAt = now;
        data.updatedAt = now;

        return db.workspaces.create(data);
    },
    read: (workspaceId) => {
        const filter = createFilter(workspaceId);

        return db.workspaces.read(filter);
    },
    update: (workspaceId, data) => {
        const filter = createFilter(workspaceId);

        data.updatedAt = utils.time.now();

        return db.workspaces.update(filter, data);
    },
    delete: (workspaceId) => {
        const filter = createFilter(workspaceId);

        return db.workspaces.delete(filter);
    }
}
