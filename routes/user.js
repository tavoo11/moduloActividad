const {Router}= require('express')

const router = Router()
const controller =  require('../controllers/user')

router
    .route('/list')
    .get(controller.all)

router
    .route('/update/:id')
    .put(controller.update)
    
router
    .route('/delete/:id')
    .put(controller.remove)

router
    .route('/register')
    .post(controller.store)

router
    .route('/me/:user')
    .get(controller.getOne)


router
    .route('/login')
    .post(controller.login)


module.exports = router