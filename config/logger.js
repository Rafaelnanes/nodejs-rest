var winston = require('winston');
var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var logDir = 'log';
module.exports = function (app) {

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    var tsFormat = () => (new Date()).toLocaleTimeString();
    var logger = new (winston.Logger)({
        transports: [
            // colorize the output to the console
            new (winston.transports.Console)({
                timestamp: tsFormat,
                colorize: true,
                level: 'info'
            }),
            new (require('winston-daily-rotate-file'))({
                filename: logDir + '/-api.log',
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                level: 'debug'
            })
        ]
    });

    logger.info('Test info log');
    logger.debug('Test debug log');

    return logger;
}