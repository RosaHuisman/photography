const express = require ('express');

const mainController = require('./controllers/mainController')
const galerieController = require('./controllers/admin/galerieController');
const mainAdminController = require('./controllers/admin/mainAdminController');
const photosController = require('./controllers/admin/photosController');

const multer  = require('multer')
const upload = multer({ dest: 'app/static/images/' })


const router = express.Router();

router.get('/', mainController.homePage)

router.get('/admin', mainAdminController.adminPage)

router.route('/admin/creategalerie')
    .get(galerieController.formCreate)
    .post(galerieController.addOne);


router.route('/admin/addphotos')
    .get(photosController.formCreate)
    .post(upload.array('gallery'), photosController.add);

router.route('/admin/showphotos') 
    .get(photosController.showPhotos)
    .post(photosController.postShowPhotos)



module.exports = router; 