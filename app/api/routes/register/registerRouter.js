const { Router } = require('express');
const { User } = require('../../../../models');

registerRouter = Router();

registerRouter.get('/', (req, res)=>{
    res.render('register/index.ejs', { errorMessage: false, values: false });
});

registerRouter.post('/', async (req, res)=>{
    let newUser = false;
    let errorsList = [];

    const user = new User({ 
        login: req.body.login, 
        password: req.body.password,
        email: req.body.email,
        birth: req.body.birth,
    });

    // add schema errors to errorList
    const schemaErrors = user.validateSync();
    if (schemaErrors) errorsListconcat(Object.values(schemaErrors.errors).map(val => val.message));
    // add password confirm match to errorList
    if (req.body.password !== req.body.password_confirmation) errorsList.push('Passwords should match');
    // check if login unique and add to errorList
    const isLoginNonUnique = await User.findOne({login: req.body.login});
    if (isLoginNonUnique) errorsList.push(`Login \"${isLoginNonUnique.login}\" allready taken`);
    // check if birth date too old or too young
    const age = new Date().getFullYear() - new Date(req.body.birth).getFullYear()
    if (age > 110) errorsList.push('Birth date incorrect, too old');
    if (age < 13) errorsList.push('You cant use this chat if you under 13');
 
    // manage routes
    if (errorsList.length === 0) {
        newUser = await user.save();
        if (newUser) req.session.user = newUser.login;
        res.redirect('/');
    } else {
        res.render('register/index.ejs', { errorMessage: errorsList.join(', '), values: req.body });
    }

});

module.exports = { registerRouter };