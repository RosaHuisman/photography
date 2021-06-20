const dotenv = require('dotenv');
dotenv.config();

const { Photos, Galerie, User } = require('../../models');


module.exports = {

    formCreate: async (request, response) => {
        try {
            const galeries = await Galerie.findAll();
            response.render('addphotos', { galeries })

        } catch (error) {
            console.error(error)
        }
    },

    add: async (request, response) => {

        try {
            const success = "photos rajoutées"
            request.files.forEach(file => {
                Photos.create({
                    name: file.filename,
                    galerie_id: request.body.galerie_id
                })
                });
            const galeries = await Galerie.findAll();

            response.render('addphotos', {
                success,
                galeries,
                file: 'uploads/${request.file.filename}' })

        } catch (error) {
            console.error(error)
        }
    },

    showPhotos: async (request, response) => {

        try {

            const galeries = await Galerie.findAll();

            response.render('showphotos', { galeries })

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
            response.render('showphotos', { galeries, photos })

        } catch (error) {
            console.error(error)
        }
    },

}