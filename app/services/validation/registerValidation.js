const { User } = require('../../../models');

// cusom checking data validation and unique of email and username
// passing errorlist in req.errorsList as array

const registerValidation = async (req, res, next) => {

    // additional validation
    // ------------------------------------------

    let errorsList = [];

    // check if login unique and length etc and add to errorList
    if (!(/^\S*$/.test(req.body.login))) errorsList.push('No whitespaces in name alowed');
    if (req.body.login && req.body.login.length<3) errorsList.push('Minimum login length 3 symblos');
    if (req.body.login && req.body.login.length>30) errorsList.push('Maximum login length 30 symblos');
    const isLoginNonUnique = await User.findOne({login: req.body.login});  // request to check if login NOT unique
    if (isLoginNonUnique) errorsList.push(`Login \"${isLoginNonUnique.login}\" allready taken`);

    // add password confirm match and length to errorList
    if (req.body.password !== req.body.password_confirmation) errorsList.push('Passwords should match');
    if (req.body.password && req.body.password_confirmation && (req.body.password.length<5 || req.body.password_confirmation.length<5)) errorsList.push('Minimum password length 5 symblos');
    if (req.body.password && req.body.password_confirmation && (req.body.password.length>50 || req.body.password_confirmation.length>50)) errorsList.push('Maximum password length 50 symblos');

    // check if birth date too old or too young
    const age = new Date().getFullYear() - new Date(req.body.birth).getFullYear()
    if (age > 110) errorsList.push('Birth date incorrect, too old');
    if (age < 13) errorsList.push('You cant use this chat if you under 13');

    // test for email
    if (!(/.+\@.+\..+/.test(req.body.email))) errorsList.push('Email invalid');
    const isEmailNonUnique = await User.findOne({email: req.body.email});  // request to check if email NOT unique
    if (isEmailNonUnique) errorsList.push(`Email \"${isEmailNonUnique.email}\" allready taken`);

    req.errorsList = errorsList; // pass data to this property
    next();

}


module.exports = {
    registerValidation
}