require('dotenv').config();

const express = require('express');
const router = require('./app/router');
//const varInitMiddleware = require('./app/middlewares/varInit');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const userMiddleware = require('./app/middlewares/user');


app.use(express.static('./app/static'));

app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(express.urlencoded({ extended: true }));

// et on rajoute la gestion des sessions
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'Un Super Secret'
}));

// et hop, notre middleware magique
app.use(userMiddleware);



app.use(router);


app.listen(PORT, _ => console.log(`Listening on http://localhost:${PORT}`));