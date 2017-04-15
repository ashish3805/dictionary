let Word = require('../models/Word');
var mongoose = require('mongoose');

var dictService = {};

dictService.getWord = function(word,callback){
     Word.findOne({ name: word.toUpperCase() }, function (err, existingWord) {
        if (err) {
            callback({ status: false, message: err });
        } else if (existingWord) {
            callback({ status: true, message: existingWord });
        } else {
            callback({ status: false, message: "word not found" });
        }
    });
}

dictService.getAllWords = function (word, callback) {
    Word.find({}, function (err, existingWords) {
        if (err) {
            callback({ status: false, message: err });
        } else if (existingWords.empty()) {
            callback({ status: false, message: "empty dictionary()" });
        } else {
            callback({ status: true, message: existingWords });
        }
    });
};

dictService.getCount = function (callback) {
    mongoose.connection.db.collection('words').count(function (err, count) {
        if (err) {
            callback({ status: false, message: err });
        } else {
            callback({ status: true, message: count });
        }
    });
};

dictService.isEmpty = function (callback) {
    mongoose.connection.db.collection('words').count(function (err, count) {
        if (err) {
            callback({ status: false, message: err });
        } else {
            if (count == 0) {
                callback({ status: true, message: true });
            } else {
                callback({ status: true, message: false });
            }
        }
    });
}

module.exports = dictService;
