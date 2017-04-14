let User = require('../models/User');
var constants = require('./constService');
var jwt = require('jsonwebtoken');

var userService = {};
userService.createNew = function (user, callback) {
    console.log(user);
    return User.findOne({ 'username': user.username }, function (err,
        existingUser) {
        if (err) {
            callback({ status: false, message: err });
        } else if (existingUser) {
            console.log(existingUser);
            callback({ status: false, message: "Username already registered" });
        } else {
            var newUser = new User();
            newUser.name = user.name;
            newUser.username = user.username;
            newUser.password = newUser.generateHash(user.password);
            return newUser.save(function (err, data) {
                if (err) {
                    callback({ status: false, message: err });
                } else {
                    callback({ status: true, message: data });
                }
            });
        }
    });
};

userService.signIn = function (user, callback) {
    console.log(user);
    return User.findOne({ 'username': user.username }, function (err, existingUser) {
        if (err) {
            callback({ status: false, message: err });
        }
        else if (!existingUser) {
            callback({ status: false, message: "User not registered!" });
        }
        else if (!(existingUser.validPassword(user.password))) {
            callback({ status: false, message: "Incorrect password!" });
        }
        else {
            var token = jwt.sign({ id: existingUser._id }, constants.APP_SECRET,
            { expiresIn: '2 days' });
            callback({ status: true, message: user, token: token });
        }
    });
}

module.exports = userService;
