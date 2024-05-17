import {initBaseDal} from './baseDal.js';
import {TABLES} from "../constants.js";

export const initUsersDal = (knex) => {
    const baseDal = initBaseDal(knex, TABLES.USERS);

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
