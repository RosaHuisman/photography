const dotenv = require('dotenv');
dotenv.config();

const {Photos, Galerie, User} = require('./app/models')

Photos.findAll({
    where: {galerie_id: 1}
}).then((photos) => {
    console.log(`on a des résultats`);
    for (const photo of photos) {
        console.log(photo.name);
    }
}).catch(error => {
    console.log(`on a eu un pépin`, error)
})

Galerie.findAll().then((galeries) => {
    console.log(`on a des résultats`);
    for (const galerie of galeries) {
        console.log(galerie.name);
    }
    
}).catch(error => {
    console.log(`on a eu un pépin`, error)
})