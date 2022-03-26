const db = require('./index');
const boom = require('@hapi/boom');
const { ObjectId } = require('mongodb');

class Model {
    collection;
    name;

    constructor(collection) {
        this.collection = db.collection(collection);
        this.name = collection;
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.collection.find().toArray((err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        })
    }
    get(id) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({_id: ObjectId(id)})
            .then(results => {
                if(!results) reject(boom.notFound(`${this.name} not found`));
                resolve(results)
            }).catch(err => reject(boom.internal()));
        })
    }
    create(doc) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(doc, (err, results) => {
                if(err) reject(err);
                resolve(results);
            })
        })
    }
    filter(doc) {
        return new Promise((resolve, reject) => {
            this.collection.findOne(doc, (err, results) => {
                if(err) reject(err);
                resolve(results);
            })
        })
    }
}

module.exports = Model;