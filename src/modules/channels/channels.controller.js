const Channel = require('./channels.model');
const {createChannelSchema} = require('./channels.schema');
const boom = require('@hapi/boom');

const ChannelController = {
    create: (req, res) => {
        const body = req.body;
        const channelModel = new Channel();
        channelModel.create(body)
        .then(result => {
            res.status(201)
            .json({ 
                id: result.instertedId,
                members: [body.creator],
                ...body
            })
        })
        .catch(err => res.sendStatus(500))
    },
    validate: (req, res, next) => {
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
    }
}

module.exports = ChannelController;