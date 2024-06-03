"use strict";

import Joi from 'joi';
import {randomUUID, randomInt} from "crypto";
import bcrypt from "bcrypt";
import {USER_ROLE} from "./constants.js";

const joi = {
    object: (schema) => Joi.object(schema),
    schemas: {
        user: {
            userId: Joi.string().uuid(),
            email: Joi.string().email(),
            password: Joi.string().min(5).max(30),
            name: Joi.string()
                .pattern(/^[a-zA-Z0-9\s']+$/)
                .min(2)
                .max(30)
                .messages({
                    "string.pattern.base":
                        "Can only contain letters, numbers, spaces and '",
                }),
            verified: Joi.boolean(),
            passwordFailedAttempts: Joi.number().integer().min(0),
            mfaSecret: Joi.string().length(32),
            mfaEnabled: Joi.boolean(),
            mfaFailedAttempts: Joi.number().integer().min(0),
        },
        session: {
            sessionId: Joi.string().uuid()
        },
        otp: Joi.string().pattern(/^[0-9]{6}$/),
        workspace: {
            workspaceId: Joi.string().uuid(),
            name: Joi.string().min(2).max(30),
        },
        userWorkspaceMapping: {
            role: Joi.string().valid(USER_ROLE.ADMIN, USER_ROLE.EDITOR, USER_ROLE.VIEWER)
        }
    }
}

const uuid = {
    v4: () => randomUUID()
};

const time = {
    now: () => new Date(),
    addMilliseconds: (date, ms) => {
        date.setMilliseconds(date.getMilliseconds() + ms);
        return date;
    },
    addSeconds: (date, seconds) => {
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    },
    addMinutes: (date, minutes) => {
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    },
    addHours: (date, hours) => {
        date.setHours(date.getHours() + hours);
        return date;
    },
    addDays: (date, days) => {
        date.setDate(date.getDate() + days);
        return date;
    },
    addMonths: (date, months) => {
        date.setMonth(date.getMonth() + months);
        return date;
    }
};

const encryption = {
    hash: (value) => bcrypt.hash(value, 10),
    compare: (value, hash) => bcrypt.compare(value, hash),
}

const otp = {
    generate: () => randomInt(100000, 999999).toString()
}

export default {
    joi,
    uuid,
    time,
    encryption,
    otp
}
