import {initBaseDal} from './baseDal.js';
import {TABLES} from "../constants.js";

export const initOtpsDal = (knex) => {
    const baseDal = initBaseDal(knex, TABLES.OTPS);

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
