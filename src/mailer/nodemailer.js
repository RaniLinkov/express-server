import {createTransport} from 'nodemailer';

export const initMailer = (options) => {
    return createTransport(options);
}
