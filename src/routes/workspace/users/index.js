"use strict";

import {Router} from 'express';

const router = Router();

import users from "../../../controllers/workspace/users/index.js";

router.post('/',
    users.post.validator,
    users.post.handler
);

router.get('/',
    users.get.handler
);
router.get('/:userId',
    users.get.validator,
    users.get.handler
);

router.put('/:userId',
    users.put.validator,
    users.put.handler
);

router.delete('/:userId',
    users.delete.validator,
    users.delete.handler
);

export default router;
