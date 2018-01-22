const express = require('express');
const router = express.Router();

let models = require('../models');
let Page = models.Page;
let User = models.User;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.post('/', function(req, res, next) {
    let page = Page.build({
        title: req.body.title,
        content: req.body.content
    })
    page.save().then(function(savedPage) {
        res.redirect(savedPage.route);
    })
});

router.get('/add', function(req, res, next) {
    res.render('addpage')
});

router.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    }).then(function(currentPage) {
        res.render('wikipage', { page: currentPage });
    }).catch(next);
})

module.exports = router;