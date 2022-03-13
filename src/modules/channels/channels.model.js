const Model = require('./../../core/db/model');
const boom = require('@hapi/boom');

class Channel extends Model {
    constructor() {
        super('channel')
    }
    searchByName(name) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({ name: name})
            .then(result => resolve(result))
            .catch(err => reject(boom.internal()));
        })

    }
}

module.exports = Channel;