import services from "../services/index.js";
import BadRequestError from "../errors/BadRequestError.js";
import ForbiddenError from "../errors/ForbiddenError.js";

const handler = async (req, res, next) => {
    if (!req.workspaceId) {
        throw new BadRequestError("Missing WorkspaceId.");
    }

    const [userWorkspaceMapping] = await services.userWorkspaceMapping.read(req.userId, req.workspaceId);

    if (!userWorkspaceMapping) {
        throw new ForbiddenError();
    }

    req.role = userWorkspaceMapping.role;

    req.extendLogger({
        role: userWorkspaceMapping.role,
    });

    next();
};

export default handler;
