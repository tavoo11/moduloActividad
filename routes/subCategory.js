const {Router} = require('express')
const router = Router()
const controller = require('../controllers/subCategory')

router
    .route('/subcategory')
    .get(controller.getAll)
    .post(controller.store)

module.exports = router