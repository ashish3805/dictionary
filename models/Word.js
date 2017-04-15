let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let wordSchema = new Schema({
    name: String,
    meaning: String
});

let Word = mongoose.model('Word', wordSchema);

module.exports = Word;
