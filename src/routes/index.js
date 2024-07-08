"use strict";

import {Router} from 'express';

const router = Router();

import auth from "./auth/index.js";
import user from "./user/index.js";
import workspace from "./workspace/index.js";

import accessTokenHandler from "../middleware/accessTokenHandler.js";
import workspaceHandler from "../middleware/workspaceHandler.js";

router
    .use('/auth', auth)
    .use(accessTokenHandler)
    .use('/user', user)
    .use('/workspace',
        workspaceHandler,
        workspace
    );

export default router;
