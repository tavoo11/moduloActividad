const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../configs/vars')
const path = require('path')
exports.store = async (req, res, next) => {
    try {

        let data = new User(req.body)
        var error = data.validateSync();
        if (error) {
            let status = []
            for (const key in error.errors) {
                let message = error.errors[key].message
                let res = {
                    field: error.errors[key].path,
                    reason: message.toString().replace(/\\|"/gi, "")
                };
                status.push(res);
            }
            return res.status(400).json({ success: false, info: 'Invalid data structure', data: status })
        } else {
            let status = await data.save();
            if (!('_id' in status)) {
                return res.status(400).json({ success: false, info: 'Fatal Error, unable to store User, try later' })
            } else {
                return res.status(200).json({ success: true, info: 'User saved successfully', data: status })
            }
        }

    } catch (error) {
        next(error)
    }

}

exports.update = async (req, res, next) => {
    try {
       

        const { id } = req.params
        const data = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (!data || !data._id)
            return res.status(400).json({ success: false, info: "User not found" })

        let html = pug.renderFile(path.join(process.cwd(), 'emails', 'activeAccount.pug'), { name: data.firstName, lastname: data.firstLastname, url: 'http://localhost:3000' })
        Email(data.email, 'Cuenta activada', html)
        return res.status(200).json({ success: true, info: "User found", data })
    } catch (error) {
        next(error)
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const { user } = req.params
        if (!user || !Types.ObjectId.isValid(user))
            return res.status(400).json({ success: false, info: 'invalid data structure' })
        const data = await User.findById(user)
        return res.status(200).json({ success: true, info: 'Ok', data: data })
    } catch (error) {
        next(error)
    }
}
exports.all = async (req, res, next) => {
    try {
        const data = await User.find({})
        return res.status(200).json({ success: true, info: "Query do it successfully", data })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const resp = await User.validaterUser(req.body);
        if (resp == null)
            return res.status(400).json({ success: false, info: "Credentials not found" })
        else if (!resp.success)
            return res.status(400).json(resp)
        const { user, token } = resp
        return res.status(200).json({ success: true, token, user });
    } catch (error) {
        return next(error);
    }
}
exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await User.findByIdAndUpdate(id, { state: false })
        if (!data || !data._id)
            return res.status(400).json({ success: false, info: "Error update User" })

        return res.status(200).json({ success: true, info: "Successful update" })
    } catch (error) {
        next(error)
    }
}
