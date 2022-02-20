const Activity = require('../models/activity')


exports.store = async (req, res, next) => {
    try {
        console.log(req.files)
        let data = new Activity(req.body)
        var error = data.validateSync();
        if(error)
        {
            let status = []
            for(const key in error.errors)
            {
                let message = error.errors[key].message
                let res = {
                    field: error.errors[key].path,
                    reason: message.toString().replace(/\\|"/gi,"")
                };
                status.push(res);
            }
            return res.status(400).json({ success: false, info: 'Invalid data structure', data:status})
        } else{
            let status = await data.save();
            if(!('_id' in status)) {
                return res.status(400).json({ success: false, info: 'Error'})
            }else {
                return res.status(200).json({ success: true, info: 'activity', data: status})
            }
        }
    } catch (error) {
        next(error)
    }
}

exports.getActivities = async (req, res, next) => {
    try {
       
        const data = await Activity.find();
        return res.status(200).json({ info:'ok', data: data })
    } catch (error) {
       next(error) 
    }
}


exports.update = async (req, res, next) => {
    try {
        const data = await Activity.findByIdAndUpdate(req.params.id, req.body)
        if(!data || !data._id)
            return res.status(400).json({info:"Error"})

        return res.status(200).json({info:"ok", data: data})
    } catch (error) {
        next(error)
    }
}


exports.getActivity = async (req, res, next) => {
    try {
        const data = await Activity.findById(req.params.id)
        if(!data || !data._id)
            return res.status(400).json({info:"Error"})

        return res.status(200).json({info:"ok", data: data})
    } catch (error) {
        next(error)
    }
}


exports.activityRemove = async (req, res, next) => {
    try {
        const data = await Activity.findByIdAndRemove(req.params.id)
        if(!data || !data._id)
            return res.status(400).json({info:"Error"})

        return res.status(200).json({info:"ok", data: data})
    } catch (error) {
        next(error)
    }
}