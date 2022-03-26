const bcrypt = require('bcrypt')
const Model = require("./users.model");
const { createUserSchema } = require("./users.schema");
const boom = require('@hapi/boom');

const UserController = {
    getAll: (req, res) => {
        const users = new User();
        users.getAll().then(results => {
            res.send(results);
        });
    },
    create: (req, res) => {
        const body = req.body;
        const model = new Model();
        const validation = createUserSchema.validate(body);
        //if the request does not fit the schema, returns a 400.
        if(validation.error) throw boom.badRequest();
        
        //else, it will continue trying to create the model.
        else model.getByEmail(body.email)
        .then(query => {
            //The user exists
            if(query !== null) res.sendStatus(409);
            
            else bcrypt.hash(body.password, 10)
                .then((hash) => {
                    //format the body
                    body.password = hash;
                    body.url = null;
                    body.userGroupId = null;
                    body.role = {};

                    //create the model into the db
                    model.create(body).then(results => {
                        delete body.password;
                        res.status(201).json({
                            ...results,
                            message: 'Successfully created'
                        });
                    }).catch(err => res.sendStatus(500));

                }).catch(err => res.sendStatus(500));

        }).catch(err =>{ throw boom.conflict('The email is already in use.')});
    },
    itExist(req, res, next) {
        const { user } = req.query;
        const userModel = new Model();
        userModel.get(user)
        .then((user) => {
            if(!user) next(boom.notFound());
            next();
        }).catch(err => next(err));
    }

}

module.exports = UserController;