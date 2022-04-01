const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('./../../modules/users/users.model');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const JwtStrategy = new Strategy(options, (payload, done) => {
    console.log(payload);
    return done(null, payload);
});


module.exports = JwtStrategy;