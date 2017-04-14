let express = require('express');
let User = require('../services/userService');
let resService = require('../services/resService');
let router = express.Router();

/* Sign In the User. */
router.post('/signin', function (req, res, next) {
  let user = req.body;
  User.signIn(user, function (data) {
    res.send(data);
  });
});

// Sign Up the user
router.post('/signup', function (req, res, next) {
  let user = req.body;
  User.createNew(user, function (data) {
    res.send(data);
  });
});

module.exports = router;
