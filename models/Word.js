
let bcrypt = require('bcrypt-nodejs');
let Schema = require('mongoose').Schema;
let wordSchema = new Schema({
    name: String,
    meaning: String
});

let Word = mongoose.model('Word', wordSchema);

module.exports = Word;
