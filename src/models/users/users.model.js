const Model = require('../../core/db/model');

class User extends Model{
    constructor() {
        super('users');
    }
}

module.exports = User;