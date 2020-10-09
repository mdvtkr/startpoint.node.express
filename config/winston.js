"use strict"

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require("winston-daily-rotate-file");
const fs = require('fs');
const settings = require('./settings');

// load logging config from settings
const env = settings.env;
const logDir = settings.log_dir;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

/** Log Level - error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 */
const logFormat = printf(info => {
	return `${info.timestamp} ${info.level}: ${info.message}`;
});

// creating file transports according to config in settings
const services = settings.services;
if(!services || services.length == 0) {
	throw "Check config/settings.js\nservices attribute is not exists or empty";
}
const logfile_per_service = (settings.logfile_per_service && settings.logfile_per_service == true);
const loggers = {};

const createServiceLogger = (name, logDir, datePattern) => {
	const logger = createLogger({
		format: format.combine(
		  format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss"
		  }),
		  format.json()
		),
		transports : [
			new transports.Console({
				level: settings.log_level["console"],
				format: format.combine(
					format.colorize(),
					logFormat
				)
			}),
			new transports.DailyRotateFile({
				level: settings.log_level[env],
				filename: `${logDir}/${name}.%DATE%.log`,
				datePattern: datePattern,
				format: logFormat,
				zippedArchive: true,
				maxSize: "20m",
				maxFiles: "15d"
			})
		]
	});

	logger.i = logger.info;
	logger.e = logger.error;
	logger.d = logger.debug;
	logger.w = logger.warn;
	logger.s = logger.silly;
	logger.h = logger.http;
	logger.v = logger.verbose;

	return logger;
};

if(!logfile_per_service) {
	loggers["master"] = createServiceLogger("master", logDir, settings.datePattern);
}
else {
	services.forEach((data, idx) => {
		loggers[data] = createServiceLogger(data, logDir, settings.datePattern);
	});
}

module.exports = loggers;
