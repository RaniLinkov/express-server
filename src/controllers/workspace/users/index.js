import requestValidator from "../../../middleware/requestValidator.js";
import utils from "../../../utils.js";
import services from "../../../services/index.js";
import {badRequestError, conflictError} from "../../../errors/index.js";

export default {
    post: {
        validator: requestValidator({
            body: utils.joi.object({
                userId: utils.joi.schemas.user.userId.required(),
                role: utils.joi.schemas.userWorkspaceMapping.role.required(),
            }),
        }),
        handler: async (req, res) => {
            if (await services.userWorkspaceMapping.read(req.body.userId, req.workspaceId)) {
                throw conflictError();
            }

            const [userWorkspaceMapping] = await services.userWorkspaceMapping.create(req.body.userId, req.workspaceId, req.body.role);

            res.items(userWorkspaceMapping);
        }
    },
    get: {
        validator: requestValidator({
            params: utils.joi.object({
                userId: utils.joi.schemas.user.userId.required(),
            }),
        }),
        handler: async (req, res) => {
            const workspaces = await services.userWorkspaceMapping.readWorkspaceUsers(req.workspaceId, req.params.userId);

            res.items(workspaces);
        }
    },
    put: {
        validator: requestValidator({
            params: utils.joi.object({
                userId: utils.joi.schemas.user.userId.required(),
            }),
            body: utils.joi.object({
                role: utils.joi.schemas.userWorkspaceMapping.role.required(),
            }),
        }),
        handler: async (req, res) => {
            if (!(await services.userWorkspaceMapping.read(req.body.userId, req.workspaceId))) {
                throw badRequestError();
            }

            const [userWorkspaceMapping] = await services.userWorkspaceMapping.update(req.params.userId, req.workspaceId, {role: req.body.role});

            res.items(userWorkspaceMapping);
        }
    },
    delete: {
        validator: requestValidator({
            params: utils.joi.object({
                userId: utils.joi.schemas.user.userId.required(),
            })
        }),
        handler: async (req, res) => {
            if (!(await services.userWorkspaceMapping.read(req.userId, req.params.workspaceId))) {
                throw badRequestError();
            }

            const [userWorkspaceMapping] = await services.userWorkspaceMapping.delete(req.params.userId, req.workspaceId);

            res.items(userWorkspaceMapping);
        }
    }
}
