"use strict";

import {Router} from 'express';

const router = Router();

import workspace from "../../controllers/workspace/index.js";
import users from "./users/index.js";

import roleHandler from "../../middleware/roleHandler.js";

import {USER_ROLE} from "../../constants.js";

router.get('/',
    workspace.get.handler
);

router.use('/users', roleHandler([USER_ROLE.ADMIN]), users);

export default router;
