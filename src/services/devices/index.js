import utils from "../../utils.js";
import db from "../../db/index.js";

export default {
    create: (userId, useragent) => {
        const data = {};

        const now = utils.time.now();

        data.deviceId = utils.uuid.v4();
        data.userId = userId;
        data.useragent = useragent;
        data.createdAt = now;

        return db.devices.create(data);
    },
    read: (userId) => {
        const filter = {};
        if (userId !== undefined) filter.userId = userId;

        return db.devices.read(filter);
    },
};
