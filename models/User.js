const { Router } = require('express');
const { Schema, SchemaTypes, model } = require('mongoose');


const UserSchema = new Schema({
    login: {
        type: String,
        minLength: [3, 'Minimum login length 3 symblos'],
        maxLength: [30, 'Maximum login length 30 symblos'],
        required: [true, 'Login is requred'],
    },
    password: {
        type: String,
        minLength: [5, 'Minimum password length 5 symblos'],
        maxLength: [50, 'Maximum password length 50 symblos'],
        required: [true, 'Password is requred']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Email invalid']
    },
    birth: {
        type: String,
    },
});

UserSchema.virtual('age').get( () => new Date().getFullYear() - new Date(this.birth).getFullYear()  );

const User = model('User', UserSchema, 'users');

module.exports = User;