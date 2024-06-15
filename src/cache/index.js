"use strict";

import {init} from "./redis.js";
import config from "../config/index.js";

const cache = init(config.CACHE);

const get = (key) => {
    return cache.get(key);
}

const set = (key, value) => {
    return cache.set(key, value);
}

const del = (key) => {
    return cache.del(key);
}

const setEx = (key, exp, value) => {
    return cache.setEx(key, exp, value);
}

const connect = async () => await cache.connect();

const disconnect = async () => await cache.quit();


export default {
    get,
    set,
    del,
    setEx,
    connect,
    disconnect
}
