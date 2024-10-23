"use strict";

import {camelToSnake, snakeToCamel} from "../utils.js";

export const initBaseDal = (knex, tableName) => {
    return {
        create: (data) => {
            return knex(tableName).insert(camelToSnake(data)).returning("*").then(snakeToCamel);
        },
        read: (filter = {}) => {
            return knex(tableName).where(filter).then(snakeToCamel);
        },
        update: (filter, data) => {
            return knex(tableName).where(filter).update(camelToSnake(data)).returning("*").then(snakeToCamel);
        },
        delete: (filter) => {
            return knex(tableName).where(filter).del().returning("*").then(snakeToCamel);
        }
    }
};
