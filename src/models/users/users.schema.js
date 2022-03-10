const joi = require('joi');

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



module.exports = schema;