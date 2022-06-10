const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../../../../models');
const { v4: uuidv4 } = require('uuid');
const { registerValidation } = require('../../validation');
const { sendEmail, htmlEmailConfirm, htmlEmailConfirmSubject } = require('../../emailSend');

registerRouter = Router();

registerRouter.get('/', (req, res)=>{
    res.render('register/index.ejs', { errorMessage: false, values: false });
});

registerRouter.post('/', registerValidation, async (req, res)=>{

    let errorsList = ('errorsList' in req) ? req.errorsList : []; // check if there errors im middleware if exist

    // hash password asyncronicaly before create new user
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
    })

    // create new user to check if data match
    const user = new User({ 
        login: req.body.login, 
        password: hashedPassword,
        email: req.body.email,
        birth: req.body.birth,
        isValidationRequired: uuidv4()
    });

    // add schema errors if there some to errorList if there one
    // -------------------------------
    const schemaErrors = user.validateSync();
    if (schemaErrors) errorsList.concat(Object.values(schemaErrors.errors).map(val => val.message));

 
    // route if data entered correctly an not
    if (errorsList.length === 0) {
        const newUser = await user.save();
        // if user created successfully login user
        if (newUser) {
            // add session vars
            req.session.user = newUser.login;
            req.session.email = newUser.email;
            req.session.isValidationRequired = newUser.isValidationRequired;
            // send validation email
            sendEmail(
                newUser.email,
                htmlEmailConfirmSubject,
                htmlEmailConfirm(req.protocol+'://'+req.get('host')+'/evalidate/?v='+newUser.isValidationRequired)
            );
        }
        // go to home if success
        res.redirect('/');
    } else {
        // try again if there is errors
        res.render('register/index.ejs', { errorMessage: errorsList.join(', '), values: req.body });
    }

});

module.exports = { registerRouter };