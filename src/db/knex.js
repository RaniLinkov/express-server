"use strict";

import knex from 'knex';

export const init = (options) => {
    return knex(options);
};
