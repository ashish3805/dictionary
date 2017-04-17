let express = require('express');
let User = require('../services/userService');
let resService = require('../services/resService');
let router = express.Router();
let auth = require('../services/authService');

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

router.put('/update', auth.authenticate('user', { session: false }), function (req, res, next) {
  let user = req.body;
  User.update(req.user,user, function (data) {
    res.send(data);
  });
});

router.get('/count', function (req, res, next) {
  User.getCount(function (messageObj) {
    res.json(messageObj);
  });
});

router.get('/all', function (req, res, next) {
  User.getAll(function (messageObj) {
    res.json(messageObj);
  });
});

router.get('/removeall', function (req, res, next) {
  User.removeAll(function (messageObj) {
    res.json(messageObj);
  });
});

router.put('/checkword', auth.authenticate('user', { session: false }),
  function (req, res, next) {
    let wordId = req.query.word_id;
    User.checkWord(req.user,wordId, function (messageObj) {
      res.json(messageObj);
    });
  });

  router.put('/uncheckword', auth.authenticate('user', { session: false }),
  function (req, res, next) {
    let wordId = req.query.word_id;
    User.unCheckWord(req.user,wordId, function (messageObj) {
      res.json(messageObj);
    });
  });
  


module.exports = router;
