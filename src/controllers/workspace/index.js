import services from "../../services/index.js";

export default {
    get: {
        handler: async (req, res) => {
            const workspaces = await services.workspaces.read(req.workspaceId);

            res.items(workspaces);
        }
    },
}