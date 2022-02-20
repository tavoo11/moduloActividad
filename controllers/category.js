const Category = require('../models/category')


exports.store = async (req, res, next) => {
    try {
        let data = new Category(req.body)
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
                return res.status(400).json({ success: false, info: 'Fatal Error, unable to category, try later'})
            }else {
                return res.status(200).json({ success: true, info: 'category saved successfully', data: status})
            }
        }
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const data = await Category.find({}).sort({ createdAt: 1 })
        console.log(data)
        return res.status(200).json({ success: true, info: "Query do it successfully", data:data })
    } catch (error) {
        next(error )
    }
}
