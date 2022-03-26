const Channel = require('./channels.model');
const User = require('./../users/users.model');
const {createChannelSchema, linkChannelSchema} = require('./channels.schema');
const boom = require('@hapi/boom');
const { ObjectId } = require('mongodb');

const ChannelController = {
    create: (req, res) => {
        const body = req.body;
        body.members = [body.creator];

        const channelModel = new Channel();
        channelModel.create(body)
        .then(result => {
            res.status(201)
            .json({ 
                id: result.instertedId,
                url: `${process.env.URL}/invite/${result.insertedId}`,
                ...body
            })
        })
        .catch(err => res.sendStatus(500))
    },
    validateCreationForm: (req, res, next) => {
        //first if the form is valid
        const body = req.body;
        const validation = createChannelSchema.validate(body);
        if(validation.error) next(boom.badRequest());        
        next();
        //then, if the name is already taken
    },
    nameNotTaken: (req, res, next) => {
        const body = req.body;
        const channelModel = new Channel();
        channelModel.searchByName(body.name)
        .then(result => {
            if(result) next(boom.conflict());
            next();
        })
        .catch(err => next(boom.internal()));
    },
    get: (req, res) => {
        const id = req.params.id;

        const model = new Channel();
        model.get(id)
        .then(obj => {
            obj.url = `${process.env.URL}/invite/${id}`

            res.json(obj);
        })
        .catch(err => res.sendStatus(404));
    },
    addUserValidator: (req, res, next) => {
        const id = req.params.id;
        const userId = req.body.user;

        const userModel = new User();
        const channelModel = new Channel();

        //check if the user and the channel exists
        const promises = [userModel.get(userId), channelModel.get(id)];

        Promise.all(promises).then(results => {
            //check if the user is already in the channel
            const [user, channel] = results;
            const isUserAdded = channel.members.find(u => u == userId);
            if(isUserAdded) next(boom.conflict()); 

            res.locals = channel;
            next();

        }).catch(err => next(err));
    },
    addUser: (req, res) => {
        const channel = res.locals;
        const userId = req.body.user;
        channel.members.push(userId);

        const channelModel = new Channel();
        channelModel.addUser(channel, userId)
        .then(doc => res.status(200).json(channel))
        .catch(err => res.sendStatus(500))
    },

}

module.exports = ChannelController;