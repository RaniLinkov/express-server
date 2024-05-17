import utils from "../../utils.js";
import db from "../../db/index.js";

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
        return db.workspaces.read({workspaceId});
    },
    update: (workspaceId, data) => {
        data.updatedAt = utils.time.now();

        return db.workspaces.update({workspaceId}, data);
    },
    delete: (workspaceId) => {
        return db.workspaces.delete({workspaceId});
    }
}
