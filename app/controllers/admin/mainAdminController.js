const dotenv = require('dotenv');
dotenv.config();

const { Photos, Galerie, User } = require('../../models');


module.exports = {
    adminPage: (request, response) => {
        response.render('admin/admin')
    },

}