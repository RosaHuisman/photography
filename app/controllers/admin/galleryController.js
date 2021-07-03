const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs')



const { Photos, Galerie, User } = require('../../models');

module.exports = {

    addOne: async (request, response, next) => {
        try {
            const succes = "galerie créée";

            const createGalerie = await Galerie.create({
                name: request.body.name,
                user_id: request.body.user_id
            });
            if (createGalerie) {
                const users = await User.findAll();

                response.render('admin/admin', { succes, users, createGalerie })

            } else {
                const users = await User.findAll();

                response.render('admin/admin', { users, error: "erreur dans la création de galerie" })
            }

        } catch (error) {
            console.log(error);
            response.status(500)
        }

    },

    delete: async (request, response) => {
        const galeries = await Galerie.findAll();
        response.render('admin/deletegalerie', { galeries });
    },

    postdelete: async (request, response) => {
        try {

            const photos = await Photos.findAll(
                {
                    where: {
                        galerie_id: request.body.galerie_id
                    },

                })

            photos.forEach(photo => {
                console.log(photo)
                const path = `static/uploads/${photo.name}`
                console.log(path)
                fs.unlinkSync(path)
            });


            const success = "galerie supprimée";
            const deletePhotos = await Photos.destroy({
                where: {
                    galerie_id: request.body.galerie_id
                },
            });

            const deleteGalerie = await Galerie.destroy({
                where: {
                    id: request.body.galerie_id
                },
            });

            const galeries = await Galerie.findAll();

            if (deleteGalerie) {
                const users = await User.findAll();


                response.render('admin/deletegalerie', { success, users, galeries })
            } else {
                const users = await User.findAll();

                response.render('admin/creategalerie', { users })
            }

        } catch (error) {
            console.error(error)
        }

    },

}