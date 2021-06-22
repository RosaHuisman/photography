const express = require ('express');

const mainController = require('./controllers/mainController')
const galerieController = require('./controllers/admin/galerieController');
const mainAdminController = require('./controllers/admin/mainAdminController');
const photosController = require('./controllers/admin/photosController');
const userController = require('./controllers/userController');

// importer les middlewares
const adminMiddleware = require('./middlewares/admin');

const multer  = require('multer')
const upload = multer({ dest: 'static/uploads/' })


const router = express.Router();

router.get('/', mainController.homePage);

router.get('/login', userController.loginPage);
router.post('/login', userController.loginAction);
router.get('/disconnect', userController.disconnect);
router.get('/profile', userController.profilePage);
router.get('/myphotos', userController.showPhotos);
router.post('/myphotos', userController.postShowPhotos)


// admin
router.get('/admin', adminMiddleware, mainAdminController.adminPage);

router.route('/admin/creategalerie')
    .get(adminMiddleware, galerieController.formCreate)
    .post(adminMiddleware, galerieController.addOne);

router.route('/admin/addphotos')
    .get(adminMiddleware, photosController.formCreate)
    .post(adminMiddleware, upload.array('gallery'), photosController.add);

router.route('/admin/showphotos') 
    .get(adminMiddleware, photosController.showPhotos)
    .post(adminMiddleware, photosController.postShowPhotos)

router.route('/admin/createuser')
    .get(adminMiddleware, userController.signupPage)
    .post(adminMiddleware, userController.signupAction);

router.route('/admin/deletegalerie')
    .get(adminMiddleware, galerieController.delete)
    .post(adminMiddleware, galerieController.postdelete)




module.exports = router; 