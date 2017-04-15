let express = require('express');
let dict = require('express').Router();
let Dictionary = require('../services/dictService');

dict.get('/', function(req, res, err) {
    let word = req.query.word;
    console.log('word: ', word);
    let meaning = Dictionary.getMeaning(word,function(messageObj){
        res.json(messageObj);
    });
});

dict.get('/isEmpty', function(req, res, err) {
    let word = req.query.word;
    console.log('word: ', word);
    let meaning = Dictionary.getMeaning(word,function(messageObj){
        res.json(messageObj);
    });
});

dict.get('/', function(req, res, err) {
    let word = req.query.word;
    console.log('word: ', word);
    let meaning = Dictionary.getMeaning(word,function(messageObj){
        res.json(messageObj);
    });
});

module.exports = dict;
