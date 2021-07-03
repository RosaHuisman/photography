const dotenv = require('dotenv');
dotenv.config();

const { Photos, Galerie, User } = require('../../models');


module.exports = {

    add: async (request, response, next) => {

        try {
            const succes = "photos rajoutées"
            console.log(request.files)
            request.files.forEach(file => {
                Photos.create({
                    name: file.filename,
                    galerie_id: request.body.galerie_id
                })
            });
            const galeries = await Galerie.findAll();
            const users = await User.findAll();


            response.render('admin/admin', {
                succes,
                galeries,
                file: 'uploads/${request.file.filename}',
                users
            })

        } catch (error) {
            console.error(error)
        }
    },

    showPhotos: async (request, response) => {

        try {

            const galeries = await Galerie.findAll();

            response.render('admin/showphotos', { galeries })

        } catch (error) {
            console.error(error)
        }
    },

    postShowPhotos: async (request, response) => {

        try {
            const galeries = await Galerie.findAll();
            const photos = await Photos.findAll(
                {
                    where: {
                        galerie_id: request.body.galerie_id
                    },

                })
            response.render('admin/showphotos', { galeries, photos })

        } catch (error) {
            console.error(error)
        }
    },

}