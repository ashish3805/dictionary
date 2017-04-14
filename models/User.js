let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    words: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
    }],
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.addWord = function(userWord) {
    let word = new Word(userWord);
    return word.save(function(err, word) {
        if (err) {

        } else {
            this.words.push(word._id);
        }
    });
    return word;
};

let User = mongoose.model('User', userSchema);
module.exports = User;
