const joi = require('joi');

const email= joi.string().email({ minDomainSegments: 2, tlds: {allow: ['com', 'net']} });
const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const name = joi.string();
const lastName = joi.string();
const urlImage = joi.string().dataUri();
const userGroupId = joi.string();
const role = joi.object({});

const createUserSchema = joi.object({
    email: email.required(),
    password: password.required(),
    name: name,
    lastName: lastName,
})

const schema = joi.object({
    email: joi.string()
    .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net']} })
    .required(),

    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

    name: joi.string(),

    lastName: joi.string(),

    urlImage: joi.string()
    .dataUri(),

    userGroupId: joi.string(),

    role: joi.object({})  
})



module.exports = {
    schema,
    createUserSchema,
};