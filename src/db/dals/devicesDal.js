"use strict";

import {initBaseDal} from './baseDal.js';
import {TABLES} from "../constants.js";

export const initDevicesDal = (knex) => {
    const baseDal = initBaseDal(knex, TABLES.DEVICES);

    return {
        create: (data) => {
            return baseDal.create(data);
        },
        read: (filter) => {
            return baseDal.read(filter);
        },
    }
}
