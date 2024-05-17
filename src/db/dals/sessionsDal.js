import {initBaseDal} from './baseDal.js';
import {TABLES} from "../constants.js";

export const initSessionsDal = (knex) => {
    const baseDal = initBaseDal(knex, TABLES.SESSIONS);

    return {
        create: (data) => {
            return baseDal.create(data);
        },
        read: (filter) => {
            return baseDal.read(filter);
        },
        delete: (filter) => {
            return baseDal.delete(filter);
        }
    }
}
