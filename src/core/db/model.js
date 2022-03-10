const db = require('./index');

class Model {
    collection;

    constructor(collection) {
        this.collection = db.collection(collection);
    }

    getAll () {
        return new Promise((resolve, reject) => {
            this.collection.find().toArray((err, results) => {
                if(err) return reject(err);
                resolve(results);
            });
        })
    }
    create(doc) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(doc, (err, results) => {
                if(err) return reject(err);
                resolve(results);
            })
        })
    }
}

module.exports = Model;