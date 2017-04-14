let express = require('express');
let dict = require('express').Router();
let Dictionary = require('../controllers/dictionary');

let dict1= new Dictionary('../data/dictionary.json');
dict1.initialize();
dict.get('/', function(req, res, err) {
    let word = req.query.word;
    let meaning = dict1.get(word);
    res.send({
        word: word,
        meaning: meaning,
    });
});

module.exports = dict;
