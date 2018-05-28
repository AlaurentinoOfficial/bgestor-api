var mongoose = require('mongoose')
import { green, red, cyan, bold } from 'colors'

exports.DbConfig = (link) => {
    mongoose.connect(link)

    mongoose.connection.on('connected', () => {
        console.log(bold(green('➜  MONGODB:')) + ' Connected!')
    });

    mongoose.connection.on('error', (err) => {
        console.log(bold(green(red('\n➜  ') + 'MONGODB:')  + red(' Connection refused!')))
        console.log(bold(green('➜  ') + cyan('SERVER:')) + " Closing server!")
        process.exit(0)
    });

    mongoose.connection.on('disconnected', () => {
        console.log(bold(green('\n➜  MONGODB:')) + ' Disconnected!')
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(bold(green('➜  ') + cyan('SERVER:')) + " Closing server!")
            process.exit(0)
        });
    });
}