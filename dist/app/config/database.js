'use strict';

var mongoose = require('mongoose');

exports.Mongo = "mongodb";

exports.DbConfig = function (link) {
    mongoose.connect(link);

    // Mongoose log
    mongoose.connection.on('connected', function () {
        console.log('\n> Database connected!\n');
    });

    mongoose.connection.on('error', function (err) {
        console.log('\n> Error - Database: ' + err + '\n');
    });

    mongoose.connection.on('disconnected', function () {
        console.log('\n> Database disconnected!\n');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('\n> Closing application!\n');
            process.exit(0);
        });
    });
};