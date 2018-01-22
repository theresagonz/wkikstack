'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

const index = require('./routes/index');

app.use('/', index);

// syncing models & start the server

models.db.sync({})
    .then(function() {
        app.listen(1337, function() {
            console.log('listening on port 1337');
        });
    }).catch(console.error);


// ERROR HANDLING
app.use(function(err, req, res, next) {
    res
        .status(500)
        .send('sorry something went really wrong but we are not sure why');
    console.log(err);
});