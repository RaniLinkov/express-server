"use strict";

import {Router} from 'express';

const router = Router();

import auth from "../../controllers/auth/index.js";

import useragent from 'express-useragent';

import accessTokenHandler from "../../middleware/accessTokenHandler.js";
import mfaAccessTokenHandler from "../../middleware/mfaAccessTokenHandler.js";
import useragentHandler from "../../middleware/useragentHandler.js";

router.post('/sign-up',
    auth.signUp.validator,
    auth.signUp.handler
);

router.post('/sign-in',
    auth.signIn.validator,
    useragent.express(),
    useragentHandler,
    auth.signIn.handler
);

router.post('/mfa/verify',
    mfaAccessTokenHandler,
    auth.mfa.verify.validator,
    auth.mfa.verify.handler
);

router.delete('/sign-out',
    accessTokenHandler,
    useragent.express(),
    useragentHandler,
    auth.signOut.handler
);

router.get('/token',
    auth.token.get.handler
);

router.post('/email/request-verification',
    auth.email.requestVerification.validator,
    auth.email.requestVerification.handler
);

router.post('/email/verify',
    auth.email.verify.validator,
    auth.email.verify.handler
);

router.post('/password/reset/request-verification',
    auth.password.reset.requestVerification.validator,
    auth.password.reset.requestVerification.handler
);

router.post('/password/reset/verify',
    auth.password.reset.verify.validator,
    auth.password.reset.verify.handler
);


export default router;
