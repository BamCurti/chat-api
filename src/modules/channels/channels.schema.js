const joi = require('joi');

const name = joi.string().min(1);
const creator = joi.string().min(1);
const description = joi.string().min(1);
const id = joi.string().min(1);

const createChannelSchema = joi.object({
    name: name.required(),
    creator: creator.required(),
    description: description.required(),
});

const linkChannelSchema = joi.object({
    id: id.required(),
    creator: creator.required()
})

module.exports = {
    createChannelSchema,
    linkChannelSchema
};