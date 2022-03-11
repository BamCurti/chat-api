const { MongoClient } = require('mongodb');

const user = process.env.USER;
const password = process.env.PASSWORD;
const url =  `mongodb+srv://${user}:${password}@testescritorio.7s7sp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const DB =  {
    dbInstance: null,
    connect: () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
                if(err) reject(err);
                this.dbInstance =  client.db('iteso_2022');
                resolve(client);
            });
        });
    },
    collection: name => this.dbInstance.collection(name),

}

module.exports = DB;