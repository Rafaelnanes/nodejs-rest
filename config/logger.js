var winston = require('winston');
var fs = require('fs');
var env = process.env.NODE_ENV || 'development';

module.exports = function(app){

    var tsFormat = () => (new Date()).toLocaleTimeString();
    var logger = new (winston.Logger)({
        transports: [
            // colorize the output to the console
            new (winston.transports.Console)({
                timestamp: tsFormat,
                colorize: true,
                level: 'info'
            }), 
            new (winston.transports.File)({
                filename: 'log/api.log',
                timestamp: tsFormat,
                level: 'debug'
            })
        ]
    });

    logger.level = 'debug';

    logger.info('teste info');
    logger.debug('teste debug');

    return logger;
}