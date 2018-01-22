const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

let models = require('../models');
let Page = models.Page;
let User = models.User;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', function(req, res, next) {
    Page.findAll().then(function(pages) {
        res.render('index', { pages: pages })
    });



})

module.exports = router;