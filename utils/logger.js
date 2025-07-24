const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
};

const customFormat = format.printf(({ level, message, timestamp }) => {
    let coloredLevel;
    switch (level) {
        case 'error':
            coloredLevel = chalk.red.bold(`[${level.toUpperCase()}]`);
            break;
        case 'warn':
            coloredLevel = chalk.yellow.bold(`[${level.toUpperCase()}]`);
            break;
        case 'info':
            coloredLevel = chalk.blue.bold(`[${level.toUpperCase()}]`);
            break;
        case 'http':
            coloredLevel = chalk.magenta.bold(`[${level.toUpperCase()}]`);
            break;
        case 'debug':
            coloredLevel = chalk.gray(`[${level.toUpperCase()}]`);
            break;
        default:
            coloredLevel = chalk.white(`[${level.toUpperCase()}]`);
    }

    return `${chalk.green(timestamp)} ${coloredLevel} ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        customFormat
    ),
    transports: [
        new transports.Console()
    ],
});

module.exports = logger;