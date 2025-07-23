const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message, stack }) => `${timestamp} ${level}: ${message}${stack ? '\n' + stack : ''}`
        )
    ),
    transports: [new winston.transports.Console()],
});

const loggerMiddleware = (req, res, next) => {
    res.on('finish', () => {
        logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
};

module.exports = loggerMiddleware;
module.exports.logger = logger;