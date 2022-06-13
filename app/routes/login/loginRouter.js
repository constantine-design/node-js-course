const { Router } = require('express');
var bcrypt = require('bcryptjs');
const { User } = require('../../../models');
const { legisterUser, loginUser } = require('../../services/databaseActions');

loginRouter = Router();


loginRouter.get('/', (req, res)=>{
    res.render('login/index.ejs', { errorMessage: false });
});


loginRouter.post('/', loginUser, async (req, res)=>{
    // if user exist then validation is ok
    if (req.user) {
        // write session vars on success
        req.session.user = req.user.login;
        req.session.email = req.user.email;
        req.session.isValidationRequired = req.user.isValidationRequired;
        // redirect home on success
        res.redirect('/');
    } else {
        // if pass is incorrect redirect login page with error msj
        res.render('login/index.ejs', { errorMessage: req.errorMessage });
    }
});


module.exports = { loginRouter };