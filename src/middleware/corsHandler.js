import cors from 'cors';
import config from '../config/index.js';

const handler = cors({
    origin: function (origin, callback) {
        !origin || config.ALLOWED_ORIGINS.includes(origin) ?
            callback(null, true) :
            callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200
});

export default handler;
