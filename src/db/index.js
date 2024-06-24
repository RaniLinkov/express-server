"use strict";

import {init} from './knex.js';
import config from '../config/index.js';
import {initUsersDal} from "./dals/usersDal.js";
import {initSessionsDal} from "./dals/sessionsDal.js";
import {initOtpsDal} from "./dals/otpsDal.js";
import {initWorkspacesDal} from "./dals/workspacesDal.js";
import {initUserWorkspaceMappingDal} from "./dals/userWorkspaceMappingDal.js";

const db = init(config.DB);

const connect = () => db.raw('SELECT 1+1 AS result');

const disconnect = () => db.destroy();

export default {
    connect,
    disconnect,
    users: initUsersDal(db),
    sessions: initSessionsDal(db),
    otps: initOtpsDal(db),
    workspaces: initWorkspacesDal(db),
    userWorkspaceMapping: initUserWorkspaceMappingDal(db)
};
