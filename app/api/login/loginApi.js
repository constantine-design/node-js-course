const { Router } = require('express');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../../models');
const { legisterUser, loginUser } = require('../../services/databaseActions');
const config = require('config');


loginApi = Router();

// login api/login post login and password and get a token as a response

loginApi.post('/', loginUser, async (req, res)=>{
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
        res.status(400).json({ message: req.errorMessage});
    }
});


module.exports = { loginApi };