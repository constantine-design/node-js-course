const { Schema, SchemaTypes, model } = require('mongoose');


const UserSchema = new Schema({
    login: {
        type: String,
        required: [true, 'Login is requred'],
    },
    password: {
        type: String,
        required: [true, 'Password is requred']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    birth: {
        type: String,
        required: [true, 'Email is required']
    },
    isValidationRequired: {
        type: String,
        default: "notvalidated"
    }

});

UserSchema.virtual('age').get( () => new Date().getFullYear() - new Date(this.birth).getFullYear()  );

const User = model('User', UserSchema, 'users');

module.exports = User;