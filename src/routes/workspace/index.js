import express from 'express';

const router = express.Router();

import users from "./users/index.js";

router.use('/users', users);

export default router;
