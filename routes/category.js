const {Router} = require('express')
const router = Router()
const controller = require('../controllers/category')

router
    .route('/category')
    .get(controller.getAll)
    .post(controller.store)


module.exports = router