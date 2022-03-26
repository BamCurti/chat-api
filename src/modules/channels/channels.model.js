const Model = require('./../../core/db/model');
const boom = require('@hapi/boom');
const { ObjectId } = require('mongodb');

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
    addUser(channel, user) {
        return new Promise((resolve, reject) => {
            this.collection.updateOne(
                {_id: channel._id}, 
                {$set: {members: channel.members}}
            ).then(doc => resolve(doc))
            .catch(err => reject(err));
        })
    }
}

module.exports = Channel;