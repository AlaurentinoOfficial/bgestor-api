var mongoose = require('mongoose')
import { green, red, cyan } from 'colors'

exports.DbConfig = (link) => {
    mongoose.connect(link)

    mongoose.connection.on('connected', () => {
        console.log(green('➜  MONGODB:') + ' Connected!')
    });

    mongoose.connection.on('error', (err) => {
        console.log(red('\n➜  ') + green('MONGODB:') + red(' Connection refused!'))
    });

    mongoose.connection.on('disconnected', () => {
        console.log(red('\n➜  ') + green('MONGODB:') + ' Disconnected!')
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(green('➜  ') + cyan('SERVER:') + " Closing server!")
            process.exit(0)
        });
    });
}