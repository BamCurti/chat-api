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
        const query = {
            _id: ObjectId(id)
        }
        const model = new Channel();
        model.filter(query)
        .then(obj => {
            obj.url = `${process.env.URL}/invite/${id}`

            res.json(obj)
        })
        .catch(err => res.sendStatus(404))
        
    }
}

module.exports = ChannelController;