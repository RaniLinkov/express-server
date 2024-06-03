"use strict";

import knex from 'knex';

export const initDb = (options) => {
    return knex(options);
};
