const dotenv = require('dotenv');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
dotenv.config();

const { Photos, Galerie, User } = require('../../models');


module.exports = {
  adminPage: async (request, response, next) => {
    const users = await User.findAll();
    const galeries = await Galerie.findAll();

    response.render('admin/admin', {users, galeries})
  },

  createUserAction: async (req, res) => {
    try {
      // les vérifs à faire : 

      // - 1: l'utilisateur existe déjà
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (user) {
        return res.render('admin/admin', {
          error: "Cet email est déjà utilisé par un utilisateur."
        });
      }
      // - 2: format d'email valide
      if (!emailValidator.validate(req.body.email)) {
        return res.render('admin/admin', {
          error: "Cet email n'est pas valide."
        });
      }
      
      // -3: Si on ne génère pas de mot de passe
      if (!req.body.password) {
        return res.render('admin/admin', {
          error: "erreur : il faut générer un mot de passe aléatoire pour créer un compte."
        });
      }

      // TOUT EST OK

      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.toLowerCase(),
        password: req.body.password
      });
      // on attend que l'utilisateur soit enregistré
      await newUser.save();
      res.render('admin/admin', {
        succes: "Compte client créé avec succès",
        
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

      const choosenclient = await User.findOne({
        where: {
          id: req.body.user_id
        }
      })
      if (choosenclient.status === 1) {
        const users = await User.findAll()
        res.render('admin/sendmailclient', { users, error: "Ce client a déjà modifié son mot de passe" })
      }
      const users = await User.findAll({ order: [['createdAt', 'DESC']] });
      res.render('admin/sendmailclient', { users, choosenclient });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }



  },



}