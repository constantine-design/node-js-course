const { Router } = require('express');
const { loginProvider } = require('../../logins');

usersRouter = Router();

usersRouter.get('/', async (req, res)=>{
    let allUsers = await loginProvider.getItems();
    res.render('users/index.ejs', { users : allUsers });
});

module.exports = { usersRouter };