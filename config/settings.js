"use strict"

const settings  = {
    // env : "production", "development"
    env : process.env.NODE_ENV || "development",    // TODO: set process env NODE_ENV as needed

    // service module list. one or more values are required.
    services : ["my_service", "web"],

    // true: each value in services array is added in log file name. 
    // false: one master log file will be generated.
    logfile_per_service : false,

    // logging level order: error, warn, info, http, verbose, debug, silly.
    log_level : {
        "console" : "debug",
        "development" : "debug",
        "production" : "info"
    },
    log_dir : __dirname + '/../logs/',
    logfile_date_pattern : "YYYYMMDD"
};

module.exports = settings;
