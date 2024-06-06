"use strict";

import requestValidator from "../../../middleware/requestValidator.js";
import utils from "../../../utils.js";
import services from "../../../services/index.js";
import {badRequestError} from "../../../errors/index.js";

export default {
    post: {
        validator: requestValidator({
            body: utils.joi.object({
                email: utils.joi.schemas.user.email.required(),
                role: utils.joi.schemas.userWorkspaceMapping.role.required(),
            }).required(),
        }),
        handler: async (req, res) => {
            const [user] = await services.users.read(undefined, req.body.email);

            if (user && 0 === (await services.userWorkspaceMapping.read(user.userId, req.workspaceId)).length) {
                await services.userWorkspaceMapping.create(user.userId, req.workspaceId, req.body.role);
            }

            res.items();
        }
    },
    get: {
        validator: requestValidator({
            params: utils.joi.object({
                userId: utils.joi.schemas.user.userId.required(),
            }).required(),
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
            }).required(),
            body: utils.joi.object({
                role: utils.joi.schemas.userWorkspaceMapping.role.required(),
            }).required(),
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
            }).required(),
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
