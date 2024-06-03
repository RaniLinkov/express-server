"use strict";

import {initMailer} from "./nodemailer.js";
import config from "../config/index.js";

const mailer = initMailer(config.MAILER);

const FROM_EMAIL = config.EMAIL;

export default {
    send: (to, subject, text, html, from = FROM_EMAIL) =>
        mailer.sendMail({to, subject, text, html, from})
};
