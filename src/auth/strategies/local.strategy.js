const { Strategy } = require('passport-local');
const UserModel = require('./../../modules/users/users.model');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
},
(email, password, next) => {
    const model = new UserModel();
    model.getByEmail(email)
    .then(user => {
        if(!user) next(boom.notFound(), false);
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(!isMatch) next(boom.unauthorized(), false);
            next(null, user);
        });
    })
    .catch(err => next(boom.notFound(), false));
}
)

module.exports = LocalStrategy;