import express from 'express';
import 'express-async-errors';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import corsHandler from "./middleware/corsHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import requestLogHandler from "./middleware/requestLogHandler.js";
import requestIdHandler from "./middleware/requestIdHandler.js";
import responseHandler from "./middleware/responseHandler.js";

import routes from "./routes/index.js";

const app = express();

app
    .use(requestLogHandler)
    .use(requestIdHandler)
    .use(helmet())
    .use(corsHandler)
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cookieParser())
    .use(responseHandler)

    .use('/api', routes)

    .use(notFoundHandler)
    .use(errorHandler);

export default app;
