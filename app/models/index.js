const User = require('./user');
const Galerie = require('./galerie');
const Photos = require('./photos');


User.hasMany(Galerie, {
    foreignKey: "user_id",
    as: "galeries"
});

Galerie.belongsTo(User, {
    foreignKey: "user_id",
    as: "users"
});

Galerie.hasMany(Photos, {
    foreignKey: "galerie_id",
    as: "photos"
});

Photos.belongsTo(Galerie, {
    foreignKey: "galerie_id",
    as: "galerie"
});

module.exports = { User, Galerie, Photos };
