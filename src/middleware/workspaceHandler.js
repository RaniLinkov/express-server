"use strict";

import services from "../services/index.js";
import {badRequestError, forbiddenError} from "../errors/index.js";
import {ERROR_MESSAGE} from "../errors/constants.js";

const handler = async (req, res, next) => {
    if (!req.workspaceId) {
        throw badRequestError(ERROR_MESSAGE.MISSING_WORKSPACE_ID);
    }

    const [userWorkspaceMapping] = await services.userWorkspaceMapping.read(req.userId, req.workspaceId);

    if (!userWorkspaceMapping) {
        throw forbiddenError();
    }

    req.role = userWorkspaceMapping.role;

    req.extendLogger({
        role: userWorkspaceMapping.role,
    });

    next();
};

export default handler;
