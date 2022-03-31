const boom = require('@hapi/boom');

//models
const Message = require('./messages.model');
const User = require('./../users/users.model');
const Channel = require('./../channels/channels.model');

const {} = require('./messages.schema');


const MessageController = {
    createValidator: (req, res, next) => {
        const { content, userId, channelId } = req.body;

        //check if it exists all the paremeters
        if(!content) next(boom.badRequest('It must have content'));
        if(!userId) next(boom.badRequest('It must have a user'));
        if(!channelId) next(boom.badRequest('It must have a channel'));

        //check if the user and the channel exists
        const userModel = new User();
        const channelModel = new Channel();

        const promises = [userModel.get(userId), channelModel.get(channelId)];
        Promise.all(promises)
        .then(results => next())
        .catch(err => next(err));
    },
    create: (req, res) => {
        const {userId, channelId, content} = req.body;

        const body = {
            userId,
            channelId,
            content,
            date: new Date() 
        }

        const message = new Message();
        message.create(body)
        .then((doc) => res.status(201).json(body))
        .catch(err => res.status(500).json(err));

    },
    get: (req, res) => {
        const user = req.query.user;
        const channel = req.query.channel;

        const query = {

        };

        console.log(query);

        const message = new Message();
        
        message.filter(query)
        .then((doc) => res.json(doc))
        .catch((err) => res.status(500).send(err));

    }
}

module.exports = MessageController;