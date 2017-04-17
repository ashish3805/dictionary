let User = require('../models/User');
var constants = require('./constService');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Word = require('../models/Word');

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

var userService = {};
userService.createNew = function (user, callback) {
    console.log(user);
    return User.findOne({ 'email': user.email.toLowerCase() }, function (err,
        existingUser) {
        if (err) {
            callback({ status: false, message: err });
        } else if (existingUser) {
            console.log(existingUser);
            callback({ status: false, message: "email already registered" });
        } else {
            var newUser = new User();
            newUser.name = user.name;
            newUser.email = user.email.toLowerCase();
            newUser.password = newUser.generateHash(user.password);
            return newUser.save(function (err, data) {
                if (err) {
                    callback({ status: false, message: err });
                } else {
                    var token = jwt.sign({ id: data._id },
                        constants.APP_SECRET, { expiresIn: '2 days' });
                    callback({ status: true, message: data, token: token });
                }
            });
        }
    });
};

userService.update = function (user, newUser, callback) {

    User.findOne({ 'email': newUser.email.toLowerCase() }, function (err,
        existingUser) {
        if (err) {
            callback({ status: false, message: err });
            return;
        } else if (existingUser) {
            console.log(existingUser._id,user._id);
            if (!existingUser._id.equals(user._id)) {
                callback({ status: false, message: "Account with this email already exists." });
                return;
            }
        }

        User.findByIdAndUpdate(user._id, {
            "$set": {
                "name": newUser.name,
                "email": newUser.email.toLowerCase()
            }
        }, { new: true }, function (err, updatedUser) {
            if (err) {
                callback({ status: false, message: err });
            }
            else {
                callback({ status: "true", message: updatedUser })
            }
        });
    });
}

userService.signIn = function (user, callback) {
    return User.findOne({ 'email': user.email.toLowerCase() },
        function (err, existingUser) {
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
                callback({ status: true, message: existingUser, token: token });
            }
        });
}

userService.getCount = function (callback) {
    mongoose.connection.db.collection('users').count(function (err, count) {
        console.dir(err);
        console.dir(count);
        if (count == 0) {
            callback({ status: true, message: "No Found Records." });
        }
        else {
            callback({ status: true, message: count });
            console.log("Found Records : " + count);
        }
    });
}

userService.getAll = function (callback) {
    User.find({}, function (err, existingUsers) {
        if (err) {
            callback({ status: false, message: err });
        } else if (!existingUsers) {
            callback({ status: false, message: "no users." });
        } else {
            callback({ status: true, message: existingUsers });
        }
    });
};

userService.removeAll = function (callback) {
    User.remove({}, function (err, existingUsers) {
        if (err) {
            callback({ status: false, message: err });
        } else if (!existingUsers) {
            callback({ status: false, message: "no users." });
        } else {
            callback({ status: true, message: existingUsers });
        }
    });
};

userService.checkWord = function (user, wordId, callback) {
    if (isInArray(wordId, user.words)) {
        callback({ status: false, message: user });
        return;
    }
    User.findByIdAndUpdate(user._id, { $push: { "words": wordId } }, { new: true }, function (err, existingUser) {
        if (err) {
            callback({ status: false, message: err });
        } else {
            callback({ status: true, message: existingUser });
        }
    });
}

userService.unCheckWord = function (user, wordId, callback) {
    console.log(user.words);
    if (!isInArray(wordId, user.words)) {
        callback({ status: false, message: user });
        return;
    }
    User.findByIdAndUpdate(user._id, { $pullAll: { "words": [wordId] } }, { new: true }, function (err, existingUser) {
        if (err) {
            callback({ status: false, message: err });
        } else {
            callback({ status: true, message: existingUser });
        }
    });
}

module.exports = userService;
