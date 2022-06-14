const { Router } = require('express');
const { registerUser } = require('../../services/databaseActions');
const { registerValidation } = require('../../services/validation');


registerRouter = Router();


registerRouter.get('/', (req, res)=>{
    res.render('register/index.ejs', { errorMessage: false, values: false });
});
 

registerRouter.post('/', registerValidation, registerUser, async (req, res)=>{

    // route if data entered correctly and not
    if (req.errorsList.length === 0 && req.user) {
        // add session vars
        req.session.user = req.user.login;
        req.session.email = req.user.email;
        req.session.isValidationRequired = req.user.isValidationRequired;
        // go to home if success
        res.redirect('/');
    } else {
        // try again if there is errors
        res.render('register/index.ejs', { errorMessage: req.errorsList.join(', '), values: req.body });
    }

});


module.exports = { registerRouter };