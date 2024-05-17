import winston from 'winston';

const {createLogger, format, transports} = winston;
const {combine, timestamp, printf, colorize, json, errors} = format;

const DEVELOPMENT = 'development';

export const initLogger = (env = DEVELOPMENT) => {
    return createLogger({
        level: env === DEVELOPMENT ? 'debug' : 'info',
        format: combine(
            timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
            errors({stack: true}),
            env === DEVELOPMENT ? combine(colorize(), printf(({level, message, timestamp, stack}) => {
                return `${timestamp} [${level}]: ${stack || message}`;
            })) : json()
        ),
        transports: [
            new transports.Console()
        ]
    });
};
