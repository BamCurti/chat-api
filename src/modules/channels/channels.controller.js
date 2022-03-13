const Channel = require('./channels.model');
const {createChannelSchema, linkChannelSchema} = require('./channels.schema');
const boom = require('@hapi/boom');
const { ObjectId } = require('mongodb');

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
        const body = req.body;
        body.apiLink = process.env.URL + "/api/channels" + req.url;

        res.json(body);
    },
    validateLinkForm: (req, res, next) => {
        const body = req.body;
        body.id = req.params.id;
        const validation = linkChannelSchema.validate(body);
        if(validation.error) next(boom.badRequest());
        next()

    },
    createdBy: (req, res, next) => {
        const filter = {
            creator: req.body.creator
        }

        const channelModel = new Channel();
        channelModel.filter(filter)
        .then((results) => {
            if(!results) next(boom.notFound());
            const id = results._id.toString();            
            if(id !== req.params.id) next(boom.forbidden())

            next();
        })
        .catch((err) => next(boom.internal()))
        

    }
}

module.exports = ChannelController;