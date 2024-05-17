import requestValidator from "../../../middleware/requestValidator.js";
import utils from "../../../utils.js";
import services from "../../../services/index.js";
import {USER_ROLE} from "../../../constants.js";
import ForbiddenError from "../../../errors/ForbiddenError.js";
import BadRequestError from "../../../errors/BadRequestError.js";

export default {
    post: {
        validator: requestValidator({
            body: utils.joi.object({
                name: utils.joi.schemas.workspace.name.required(),
            }),
        }),
        handler: async (req, res) => {
            const [workspace] = await services.workspaces.create(req.body.name);

            await services.userWorkspaceMapping.create(req.userId, workspace.workspaceId, USER_ROLE.ADMIN);

            res.items(workspace);
        }
    },
    get: {
        validator: requestValidator({
            params: utils.joi.object({
                workspaceId: utils.joi.schemas.workspace.workspaceId.required(),
            }),
        }),
        handler: async (req, res) => {
            const workspaces = await services.userWorkspaceMapping.readUserWorkspaces(req.userId, req.params.workspaceId);

            res.items(workspaces);
        }
    },
    put: {
        validator: requestValidator({
            params: utils.joi.object({
                workspaceId: utils.joi.schemas.workspace.workspaceId.required(),
            }),
            body: utils.joi.object({
                name: utils.joi.schemas.workspace.name.required(),
            }),
        }),
        handler: async (req, res) => {
            const [userWorkspaceMapping] = await services.userWorkspaceMapping.read(req.userId, req.params.workspaceId);

            if (!userWorkspaceMapping) {
                throw new BadRequestError();
            }

            if (userWorkspaceMapping.role !== USER_ROLE.ADMIN) {
                throw new ForbiddenError();
            }

            const [workspace] = await services.workspaces.update(req.params.workspaceId, {name: req.body.name});

            res.items(workspace);
        }
    },
    delete: {
        validator: requestValidator({
            params: utils.joi.object({
                workspaceId: utils.joi.schemas.workspace.workspaceId.required(),
            })
        }),
        handler: async (req, res) => {
            const [userWorkspaceMapping] = await services.userWorkspaceMapping.read(req.userId, req.params.workspaceId);

            if (!userWorkspaceMapping) {
                throw new BadRequestError();
            }

            if (userWorkspaceMapping.role !== USER_ROLE.ADMIN) {
                throw new ForbiddenError();
            }

            await services.userWorkspaceMapping.delete(undefined, req.params.workspaceId);
            const [workspace] = await services.workspaces.delete(req.params.workspaceId);

            res.items(workspace);
        }
    },
    detach: {
        validator: requestValidator({
            params: utils.joi.object({
                workspaceId: utils.joi.schemas.workspace.workspaceId.required(),
            })
        }),
        handler: async (req, res) => {
            const [userWorkspace] = await services.userWorkspaceMapping.readUserWorkspaces(req.userId, req.params.workspaceId);

            if (!userWorkspace) {
                throw new BadRequestError();
            }

            await services.userWorkspaceMapping.delete(req.userId, req.params.workspaceId);

            res.items(userWorkspace);
        }
    },
    switch: {
        validator: requestValidator({
            params: utils.joi.object({
                workspaceId: utils.joi.schemas.workspace.workspaceId.required(),
            })
        }),
        handler: async (req, res) => {
            const [userWorkspaceMapping] = await services.userWorkspaceMapping.read(req.userId, req.params.workspaceId);

            if (!userWorkspaceMapping) {
                throw new BadRequestError();
            }

            return res
                .refreshTokenCookie(
                    await services.auth.refreshToken.sign({
                        sessionId: req.sessionId,
                        workspaceId: req.params.workspaceId,
                    }),
                )
                .items({
                    accessToken: await services.auth.accessToken.sign({
                        sessionId: req.sessionId,
                        workspaceId: req.params.workspaceId,
                        userId: req.userId,
                    }),
                });
        }
    }
}
