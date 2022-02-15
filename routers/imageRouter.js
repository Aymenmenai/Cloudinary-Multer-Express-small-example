const imageControllers = require('../controllers/imageControllers')
const{Router}=require('express')
const router =  Router()

router.post('/add',imageControllers.uploadProductImages,imageControllers.addImage)
router.get('/',imageControllers.allImage)

module.exports = router