const { Router } = require('express');
const { registerValidation } = require('../../services/validation');
const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const { legisterUser, loginUser, registerUser } = require('../../services/databaseActions');
const config = require('config');


registerApi = Router();
 
// this route registers new user with the same data as in register form and respoce with token for new user

registerApi.post('/', registerValidation, registerUser, async (req, res)=>{

    const tokenSecret = config.get('tokenSecret');
    const tokenExpire = config.get('tokenExpire');
    // if user exist then validation is ok
    if (req.user) {
        // genegate token
        const tokenContent = {
            user: req.user.login,
            email: req.user.email,
            isValidationRequired: req.user.isValidationRequired
        }
        const token = jwt.sign(tokenContent, tokenSecret, { expiresIn: tokenExpire });
        // send token
        res.status(200).json(token);
    } else {
        // bad credentials
        res.status(400).json({ message: req.errorsList});
    }

});


module.exports = { registerApi };