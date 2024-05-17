import express from 'express';

const router = express.Router();

import users from "../../../controllers/workspace/users/index.js";

router.get('/',
    users.get.handler
);

router.get('/:userId',
    users.get.validator,
    users.get.handler
);

router.post('/',
    users.post.validator,
    users.post.handler
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
