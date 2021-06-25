const { User, Photos, Galerie } = require('../models/');
const bcrypt = require('bcrypt');

const userController = {

  loginPage: (req, res) => {
    res.render('login');
  },

  loginAction: async (req, res) => {
    try {
      //    console.log(req.body);
      // on tente de récupérer l'utilisateur qui possède l'email donné
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        return res.render('login', {
          error: "Cet email n'existe pas."
        });
      }

      // Si on a un utilisateur, on teste si le mot de passe est valide
      const validPwd = await bcrypt.compare(req.body.password, user.password);
      if (!validPwd) {
        return res.render('login', {
          error: "Ce n'est pas le bon mot de passe."
        });
      }

      // si tout va bien, on met l'utilisateur en session...
      req.session.user = user;
      //... mais on supprime son mdp !
      delete req.session.user.password;
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin')
      }

      console.log(req.session.user.createdAt)
      console.log(req.session.user.updatedAt)

      if (req.session.user.createdAt === req.session.user.updatedAt) {
        console.log('on va maintenant pouvoir aller sur la page changement mot de passe')
        //return res.redirect('/changepassword')
      } else {
        console.log('on va aller sur la page accueil profil')
      //return res.redirect('/profile');
      }
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },

  disconnect: (req, res) => {
    req.session.user = false;
    return res.redirect('/login');
  },

  profilePage: (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    res.render('profile', {
      user: req.session.user
    });
  },

  showPhotos: async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const galeries = await Galerie.findAll({
      where: { user_id: req.session.user.id }
    })

    res.render('lookphotos', {
      user: req.session.user, galeries
    });
  },

  postShowPhotos: async (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }


    try {
      const galeries = await Galerie.findAll({
        where: { user_id: req.session.user.id }
      });

      const photos = await Photos.findAll(
        {
          where: {
            galerie_id: req.body.galerie_id
          },

        })
      res.render('lookphotos', { galeries, photos })

    } catch (error) {
      console.error(error)
    }
  },

  myAccount: async (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    res.render('myaccount', {
      user: req.session.user
    });
  },

  changePassword: async (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    res.render('changepassword')

  },

  actionChangePassword: async (req, res, next) => {

    try {
      if (!req.session.user) {
        return res.redirect('/login');
      }
      //const user = await User.findByPK(req.session.user.id);

      const validPwd = await bcrypt.compare(req.body.oldPassword, req.session.user.password);
      if (!validPwd) {
        return res.render('changepassword', {
          error: "Ce n'est pas votre ancien mot de passe"
        });
      }

      if (req.body.newPassword !== req.body.newPasswordConfirm) {
        return res.render('changepassword', {
          error: "La confirmation du nouveau mot de passe ne correspond pas."
        });
      }
      // - 4: Si on avait le courage, vérifier que le mdp répond aux recommendations CNIL...

      // 5 - On crypt
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.newPassword, salt);

      // chercher le user en question et lui changer son mot de passe avec password: encryptedpassword


      await User.update(
        {password: encryptedPassword},
        {where: {
          id: req.session.user.id
        },
      
      });
      res.render('changepassword', {
        succes: "Mot de passe changé"
      });

    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }

  },


};

module.exports = userController;