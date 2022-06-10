const { Router } = require('express');
const { User } = require('../../../../models');

emailValidateRouter = Router();

emailValidateRouter.get('/', (req, res)=>{
    User.findOneAndUpdate({isValidationRequired: req.query.v}, {isValidationRequired: ""}, function(err, doc){
        if (err) console.log(err);
        if (doc.login == req.session.user) req.session.isValidationRequired = "";
        res.redirect('/');
    });
});

module.exports = { emailValidateRouter };