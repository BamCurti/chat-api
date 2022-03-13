const joi = require('joi');

const name = joi.string().min(1);
const creator = joi.string();

const createChannelSchema = joi.object({
    name: name.required(),
    creator: creator.required(),
});

module.exports = {
    createChannelSchema
};