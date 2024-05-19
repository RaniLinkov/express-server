import express from 'express';

const router = express.Router();

import users from "./users/index.js";

import roleHandler from "../../middleware/roleHandler.js";

import {USER_ROLE} from "../../constants.js";

router.use('/users', roleHandler([USER_ROLE.ADMIN]), users);

export default router;
