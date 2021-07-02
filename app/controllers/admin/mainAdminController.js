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
      /*
      // - 3: le mdp et la confirmation ne correspondent pas
      if (req.body.password !== req.body.passwordConfirm) {
        return res.render('admin/signup', {
          error: "La confirmation du mot de passe ne correspond pas."
        });
      }
      */
      // - 4: Si on avait le courage, vérifier que le mdp répond aux recommendations CNIL...

      // 5 - On crypt (on ne crypte pas le mot de passe aléatoire qui sera envoyé au client, il est provisoire, on cryotera son mdp une fois qu'il l'aura changé)
      //const salt = await bcrypt.genSalt(10);
      //const encryptedPassword = await bcrypt.hash(req.body.password, salt);

      // Si on est tout bon, on crée le User !
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.toLowerCase(),
        password: req.body.password
        //password: encryptedPassword
      });
      const users = await User.findAll()
      // on attend que l'utilisateur soit enregistré
      await newUser.save();
      res.render('admin/signup', {
        succes: "Compte client créé",
        users
      });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },

  sendMail: async (req, res) => {
    try {
      const users = await User.findAll({ order: [['createdAt', 'DESC']] });
      res.render('admin/sendmailclient', { users });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }


  },


  sendMailAction: async (req, res) => {

    try {
      console.log(req.body.user_id)
     
      const choosenclient = await User.findOne({
        where: {
          id: req.body.user_id
        }
      })
      console.log(choosenclient)
      if(choosenclient.status === 1) {
        const users = await User.findAll()
        res.render('admin/sendmailclient', { users, error : "Ce client a déjà modifié son mot de passe" })
      }
      const users = await User.findAll({ order: [['createdAt', 'DESC']] });
      res.render('admin/sendmailclient', { users, choosenclient });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }



  },



}