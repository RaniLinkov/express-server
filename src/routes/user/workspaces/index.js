"use strict";

import {Router} from 'express';

const router = Router();

import workspaces from "../../../controllers/user/workspaces/index.js";

router.post('/',
    workspaces.post.validator,
    workspaces.post.handler
);

router.get('/',
    workspaces.get.handler
);

router.get('/:workspaceId',
    workspaces.get.validator,
    workspaces.get.handler
);

router.put('/:workspaceId',
    workspaces.put.validator,
    workspaces.put.handler
);

router.delete('/:workspaceId',
    workspaces.delete.validator,
    workspaces.delete.handler
);

router.delete('/:workspaceId/detach',
    workspaces.detach.validator,
    workspaces.detach.handler
);

router.post('/:workspaceId/switch',
    workspaces.switch.validator,
    workspaces.switch.handler
);

export default router;
