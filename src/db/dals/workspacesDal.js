"use strict";

import {initBaseDal} from './baseDal.js';
import {TABLES} from "../constants.js";

export const initWorkspacesDal = (knex) => {
    const baseDal = initBaseDal(knex, TABLES.WORKSPACES);

    return {
        create: (data) => {
            return baseDal.create(data);
        },
        read: (filter) => {
            return baseDal.read(filter);
        },
        update: (filter, data) => {
            return baseDal.update(filter, data);
        },
        delete: (filter) => {
            return baseDal.delete(filter);
        }
    }
}
