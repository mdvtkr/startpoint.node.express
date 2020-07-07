const winston = require('winston');
const fs = require('fs');

const logDir = __dirname + '/../logs/'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const options = { 
	info : {
		filename : logDir + 'info.log',
		maxsize : 1024 * 1024 * 5,
		maxFiles : 30,
		level : 'info' 
	},
	error : {
		filename : logDir + 'error.log',
		maxsize : 1024 * 1024 * 5,
		maxFiles : 30,
		level : 'error'
	}
};

const infoTransport = new winston.transports.File(options.info);
const errorTransport = new winston.transports.File(options.error);

const logger = winston.createLogger({
  transports: [infoTransport, errorTransport]
})

module.exports = logger;
