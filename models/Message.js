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
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
    }

});

const Message = model('Message', MessageSchema, 'message');

module.exports = Message;