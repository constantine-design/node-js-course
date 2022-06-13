const bcrypt = require('bcryptjs');
const { User } = require('../../../models');
const { v4: uuidv4 } = require('uuid');


const loginUser = async (req, res, next) => {
    const user = await User.findOne({login: req.body.login});
    if (user != null && req.body.password) {
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password); 
        // check if pass is correct
        if (isPasswordMatch) {
            // on success
            req.user = user;
        } else {
            // pass is incorrect
            req.errorMessage = "Password incorrect";
        }
    } else {
        // login is icorrect
        req.errorMessage = "Login incorrect" ;
    }
    next();
}


module.exports = { loginUser }