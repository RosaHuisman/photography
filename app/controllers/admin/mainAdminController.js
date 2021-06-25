const dotenv = require('dotenv');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
dotenv.config();

const { Photos, Galerie, User } = require('../../models');


module.exports = {
  adminPage: (request, response) => {
    response.render('admin/admin')
  },

  signupPage: (req, res) => {
    res.render('admin/signup');
  },

  signupAction: async (req, res) => {
    try {
      // les vérifs à faire : 

      // - 1: l'utilisateur existe déjà
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (user) {
        return res.render('admin/signup', {
          error: "Cet email est déjà utilisé par un utilisateur."
        });
      }
      // - 2: format d'email valide
      if (!emailValidator.validate(req.body.email)) {
        return res.render('admin/signup', {
          error: "Cet email n'est pas valide."
        });
      }

      // - 3: le mdp et la confirmation ne correspondent pas
      if (req.body.password !== req.body.passwordConfirm) {
        return res.render('admin/signup', {
          error: "La confirmation du mot de passe ne correspond pas."
        });
      }
      // - 4: Si on avait le courage, vérifier que le mdp répond aux recommendations CNIL...

      // 5 - On crypt
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.password, salt);

      // Si on est tout bon, on crée le User !
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptedPassword
      });

      // on attend que l'utilisateur soit enregistré
      await newUser.save();
      res.render('admin/signup', {
        succes: "Compte client créé"
      });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },

}