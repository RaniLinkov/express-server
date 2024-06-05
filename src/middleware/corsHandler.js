"use strict";

import cors from 'cors';
import config from '../config/index.js';

const handler = cors({
    origin: config.ALLOWED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200
});

export default handler;
