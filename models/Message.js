const { Schema, SchemaTypes, model } = require('mongoose');


const MessageSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: new Date()
    },
    message: {
        type: String,
    }

});

const Message = model('Message', MessageSchema, 'message');

module.exports = Message;