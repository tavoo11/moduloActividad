const { Router } = require('express')
const router = Router()
const controller = require('../controllers/activity')
const upload = require('../libs/multer')

router
    .route('/')
    .get(controller.getActivities)
    .post(upload.fields({ name: "images", maxCount: 1 }, { name: "resources", maxCount: 1 }), controller.store)

router
    .route('/one/:id')
    .get(controller.getActivity)

router
    .route('/update/:id')
    .put(controller.update)

router
    .route('/remove/:id')
    .delete(controller.activityRemove)

module.exports = router