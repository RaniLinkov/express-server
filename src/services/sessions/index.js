"use strict";

import utils from "../../utils.js";
import db from "../../db/index.js";
import cache from "../../cache/index.js";
import {TRUE_STRING} from "../../constants.js";

export default {
    create: (userId, deviceId) => {
        const data = {};

        const now = utils.time.now();

        data.sessionId = utils.uuid.v4();
        data.userId = userId;
        data.deviceId = deviceId;
        data.createdAt = now;
        data.expiresAt = utils.time.addDays(now, 7);

        return db.sessions.create(data);
    },
    read: (sessionId, userId, deviceId) => {
        const filter = {};
        if (sessionId !== undefined) filter.sessionId = sessionId;
        if (userId !== undefined) filter.userId = userId;
        if (deviceId !== undefined) filter.deviceId = deviceId;

        return db.sessions.read(filter);
    },
    delete: (sessionId, userId) => {
        const filter = {};
        if (sessionId !== undefined) filter.sessionId = sessionId;
        if (userId !== undefined) filter.userId = userId;

        return db.sessions.delete(filter);
    },
    blackList: (sessionId) => {
        return cache.setEx(sessionId, 1000 * 60 * 60, TRUE_STRING); // 1 hour
    },
    isBlackListed: (sessionId) => {
        return cache.get(sessionId).then((value) => TRUE_STRING === value);
    }
};
