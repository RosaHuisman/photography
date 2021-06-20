const dotenv = require('dotenv');
dotenv.config();

const { Photos, Galerie, User } = require('../../models');

module.exports = {

    formCreate: async (request, response) => {
        const users = await User.findAll();
        response.render('creategalerie', { users });
    },

    addOne: async (request, response) => {
        try {
            const success = "galerie créée";
            const createGalerie = await Galerie.create({
                name: request.body.name,
                user_id: request.body.user_id
            });
            if (createGalerie) {
                const users = await User.findAll();

                response.render('creategalerie', { success, users })
            } else {
                const users = await User.findAll();

                response.render('creategalerie', { users })
            }

        } catch (error) {
            console.error(error)
        }

    },

}