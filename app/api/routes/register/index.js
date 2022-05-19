const { Router } = require('express');
const { loginProvider } = require('../../logins');
const { mwValidation } = require('../../validate');

registerRouter = Router();

registerRouter.get('/', (req, res)=>{
    res.render('register/index.ejs', { errorMessage: false, values: false });
});

registerRouter.post('/', mwValidation, async (req, res)=>{

    if (!req.notvalidated) {
        await loginProvider.setItem({ 
            login: req.body.login, 
            password: req.body.password,
            email: req.body.email,
            birth: req.body.birth,
        });
        req.session.user = req.body.login;
        res.redirect('/');
    } else {
        res.render('register/index.ejs', { errorMessage: req.notvalidated, values: req.body });
    }
    
});

module.exports = { registerRouter };