"use strict";

import utils from "../../utils.js";
import db from "../../db/index.js";

const createFilter = (userId, email) => {
    const filter = {};
    if (userId !== undefined) filter.userId = userId;
    if (email !== undefined) filter.email = email;

    return filter;
};

export default {
    create: async (email, password, name) => {
        const data = {};

        const now = utils.time.now();

        data.email = email;
        data.password = await utils.encryption.hash(password);
        data.name = name;
        data.userId = utils.uuid.v4();
        data.createdAt = now;
        data.updatedAt = now;
        data.verified = false;
        data.passwordFailedAttempts = 0;
        data.mfaEnabled = false;
        data.mfaFailedAttempts = 0;
        data.mfaLockedUntil = null;
        data.mfaSecret = null;

        return db.users.create(data);
    },
    read: (userId, email) => {
        const filter = createFilter(userId, email);

        return db.users.read(filter);
    },
    update: async (userId, data) => {
        if (data.password) {
            data.password = await utils.encryption.hash(data.password);
        }

        data.updatedAt = utils.time.now();

        return db.users.update({userId}, data);
    },
}
