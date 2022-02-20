
const Subcategory = require('../models/subcategory')


exports.store = async (req, res, next) => {
    try {
        let data = new Subcategory(req.body)
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
                return res.status(400).json({ success: false, info: 'Fatal Error, unable to subcategory, try later'})
            }else {
                return res.status(200).json({ success: true, info: 'subcategory saved successfully', data: status})
            }
        }
    } catch (error) {
        next(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const data = await Store.Subcategory({}).sort({ createdAt: 1 }).populate('category')
        return res.status(200).json({ success: false, info: "Query do it successfully", data })
    } catch (error) {
        next(error )
    }
}