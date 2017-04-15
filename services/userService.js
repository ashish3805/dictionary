let User = require('../models/User');
var constants = require('./constService');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var userService = {};
userService.createNew = function (user, callback) {
    console.log(user);
    return User.findOne({ 'email': user.email }, function (err,
        existingUser) {
        if (err) {
            callback({ status: false, message: err });
        } else if (existingUser) {
            console.log(existingUser);
            callback({ status: false, message: "email already registered" });
        } else {
            var newUser = new User();
            newUser.name = user.name;
            newUser.email = user.email;
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
    return User.findOne({ 'email': user.email }, function (err, existingUser) {
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

userService.getAll = function(callback){
    User.find({},function(err, existingUsers){
        if(err){
            callback({ status: false, message: err });
        }else if(!existingUsers){
            callback({ status: false, message: "no users." });
        }else{
            callback({ status: true, message: existingUsers});
        }   
    });
};

userService.removeAll = function(callback){
    User.remove({},function(err, existingUsers){
        if(err){
            callback({ status: false, message: err });
        }else if(!existingUsers){
            callback({ status: false, message: "no users." });
        }else{
            callback({ status: true, message: existingUsers});
        }   
    });
};

module.exports = userService;
