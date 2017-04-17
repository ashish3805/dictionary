let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: String,
    email: String,
    password: String,
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

userSchema.methods.isInWords = function(wordId) {
    return this.words.includes(wordId);
};

let User = mongoose.model('User', userSchema);
module.exports = User;
