"use strict";

import {Router} from 'express';

const router = Router();

import user from "../../controllers/user/index.js";

import workspaces from "./workspaces/index.js";

router.get('/',
    user.get.handler
);

router.put('/',
    user.put.handler
);

router.put('/password/update',
    user.password.update.validator,
    user.password.update.handler
);

router.post('/mfa/setup',
    user.mfa.setup.handler
);

router.post('/mfa/enable',
    user.mfa.enable.validator,
    user.mfa.enable.handler
);

router.post('/mfa/disable',
    user.mfa.disable.validator,
    user.mfa.disable.handler
);

router.use('/workspaces', workspaces);

export default router;
