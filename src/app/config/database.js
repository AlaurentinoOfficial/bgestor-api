var mongoose = require('mongoose')

exports.Mongo = "mongodb";

exports.DbConfig = (config) => {
    var user = config.username
                        && config.password
                        ? config.username + ":" + config.password + "@" : ""
    mongoose.connect(config.type + "://"
                    + user
                    + config.ip + ":"
                    + config.port + "/"
                    + config.database)

    mongoose.connection.on('connected', () => {
        console.log('\n> Database connected!\n')
    });

    mongoose.connection.on('error', (err) => {
        console.log('\n> Error - Database: ' + err + '\n')
    });

    mongoose.connection.on('disconnected', () => {
        console.log('\n> Database disconnected!\n')
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('\n> Closing application!\n')
            process.exit(0)
        });
    });
}