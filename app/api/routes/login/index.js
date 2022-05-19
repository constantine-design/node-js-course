const { Router } = require('express');
const { loginProvider } = require('../../logins');

loginRouter = Router();

loginRouter.get('/', (req, res)=>{
    let isLogged = false;
    if (req.session.user) isLogged = req.session.user;
    res.render('login/index.ejs', { isLogged : isLogged });
});

loginRouter.post('/', async (req, res)=>{
    let allUsers = await loginProvider.getItems();
    let isLogged = false;
    for (user of allUsers) {
        if (user.login === req.body.login && user.password === req.body.password) {
            req.session.user = user.login;
            isLogged = user.login;
        } 
    }
    res.redirect('/');
});

module.exports = { loginRouter };