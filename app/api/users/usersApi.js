const { Router } = require('express');
const { User } = require('../../../models');

usersApi = Router();

// this route send list of all users names only which can be seen without auth

usersApi.get('/', async (req, res)=>{
    const listLogins = await User.find({},{login:1});
    res.status(200).json(listLogins);
});

module.exports = { usersApi };