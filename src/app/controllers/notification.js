import { NotificationSchema } from '../models/notification'

exports.getAll = (req, res) => {
    NotificationSchema.find({user: res.locals.user._id}, (err, notifications) => {
        if (err || notifications.length == 0)
            return res.json([])
        
        res.json(notifications)
    })
}

exports.statusOk = (req, res) => {
    NotificationSchema.findOneAndUpdate({user: res.locals.user._id, _id: req.params.id}, {status: true}, (err, user) => {
        if(err || !user)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}