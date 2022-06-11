const { Router } = require('express');
var bcrypt = require('bcryptjs');
const { User } = require('../../../models');

loginRouter = Router();

loginRouter.get('/', (req, res)=>{
    res.render('login/index.ejs', { errorMessage: false });
});

loginRouter.post('/', async (req, res)=>{
    const user = await User.findOne({login: req.body.login});
    if (user) {
        const isPasswordsMatch = await bcrypt.compare(req.body.password, user.password);
        // check if pass is correct
        if (isPasswordsMatch) {
            // write session vars on success
            req.session.user = user.login;
            req.session.email = user.email;
            req.session.isValidationRequired = user.isValidationRequired;
            // redirect home on success
            res.redirect('/');
        } else {
            // if pass is incorrect
            res.render('login/index.ejs', { errorMessage: "Password incorrect" });
        }
    } else {
        // if login is icorrect
        res.render('login/index.ejs', { errorMessage: "Login incorrect" });
    }
});

module.exports = { loginRouter };