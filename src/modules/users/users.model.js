const Model = require('../../core/db/model');
const boom = require('@hapi/boom'); 

class User extends Model{
    constructor() {
        super('users');
    }

    getByEmail(email) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({email: email})
            .then(result => resolve(result))
            .catch(err => reject(boom.internal()));
        })
    }
}

module.exports = User;