const { Router } = require('express');
const { User } = require('../../../../models');

usersRouter = Router();

usersRouter.get('/', async (req, res)=>{
    const allUsers = await User.find();
    res.render('users/index.ejs', { users : allUsers });
});

module.exports = { usersRouter };