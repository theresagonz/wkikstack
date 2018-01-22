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
    User.findOrCreate({
            where: {
                name: req.body.author,
                email: req.body.email
            }
        })
        .then(function(values) {
            let user = values[0];

            let page = Page.build({
                title: req.body.title,
                content: req.body.content
            })
            return page.save().then(function(page) {
                return page.setAuthor(user);
            });
        })
        .then(function(page) {
            res.redirect(page.route);
        })
        .catch(next);
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
        currentPage.getAuthor().then(function(author) {
            res.render('wikipage', { page: currentPage, author: author });
        })
    }).catch(next);
})

module.exports = router;