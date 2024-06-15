"use strict";

import {createClient} from 'redis';

export const init = (options) => {
    return createClient(options);
}
