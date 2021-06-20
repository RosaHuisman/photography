require('dotenv').config();

const express = require('express');
const router = require('./app/router');
//const varInitMiddleware = require('./app/middlewares/varInit');
const session = require('express-session');

//const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('./app/static'));

app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(express.urlencoded({ extended: true }));


app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'Un Super Secret'
}));

// Un petit middleware maison afin d'initialiser des variables utiles dans la réponse.
// ici on la créer pour initialisé une propriété user en objet vide et ne pas générer d'erreur quand aucun utilisateur n'encore été récupéré
//app.use(varInitMiddleware);
// Il serait surcharger dans le router si on récupère une utilisateur de la base ou d'un formulaire





app.use(router);


app.listen(PORT, _ => console.log(`Listening on http://localhost:${PORT}`));