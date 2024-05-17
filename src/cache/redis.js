import {createClient} from 'redis';

export const initCache = (options) => {
    return createClient(options);
}
