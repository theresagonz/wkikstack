const express = require('express');
const router = express.Router();

let models = require('../models');
let Page = models.Page;
let User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.findAll({}).then(function(users) {
        res.render('users', { users: users });
    }).catch(next);
});

router.get('/:id', function(req, res, next) {
    Page.findAll({
        where: {
            authorId: req.params.id
        }
    }).then(function(pages) {
        User.findById(req.params.id).then(function(user) {
            res.render('user', { user: user, pages: pages });
        })
    }).catch(next);
});

module.exports = router;