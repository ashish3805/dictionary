var JwtStrategy = require('passport-jwt').Strategy;
var passport = require('passport');
var constants = require('./constService');
var ExtractJwt = require('passport-jwt').ExtractJwt;
let User = require('../models/User');


passport.use('user', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: constants.APP_SECRET
}, function (jwt_payload, done) {
    User.findOne({ '_id': jwt_payload.id }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
    });
}));

module.exports = passport;
