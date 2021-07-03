const express = require ('express');

const mainController = require('./controllers/mainController')
const galleryController = require('./controllers/admin/galleryController');
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
router.post('/myphotos', userController.postShowPhotos);
router.get('/myaccount', userController.myAccount);
router.post('/myaccount', userController.changeInfosUser);
router.get('/changepassword', userController.changePassword);
router.post('/changepassword', userController.actionChangePassword);


// admin
router.get('/admin', adminMiddleware, mainAdminController.adminPage);

router.route('/admin/creategallery')
    .post(adminMiddleware, galleryController.addOne);

router.route('/admin/addphotos')
    .post(adminMiddleware, upload.array('gallery'), photosController.add);

router.route('/admin/showphotos') 
    .get(adminMiddleware, photosController.showPhotos)
    .post(adminMiddleware, photosController.postShowPhotos)

router.route('/admin/createuser')
    .post(adminMiddleware, mainAdminController.createUserAction);

router.route('/admin/deletegalerie')
    .get(adminMiddleware, galleryController.delete)
    .post(adminMiddleware, galleryController.postdelete)

router.route('/admin/sendmailclient')
    .get(adminMiddleware, mainAdminController.sendMail)
    .post(adminMiddleware, mainAdminController.sendMailAction);


module.exports = router; 