const { Router } = require('express');
const { User } = require('../../../models');
const { sendEmail, htmlEmailConfirm, htmlEmailConfirmSubject } = require('../../services/emailSend');

emailResendRouter = Router();

// resending registration email must be auth for this

emailResendRouter.get('/', (req, res)=>{
    if (req.session.user && req.session.email && req.session.isValidationRequired) {
        sendEmail(
            req.session.email,
            htmlEmailConfirmSubject,
            htmlEmailConfirm(req.protocol+'://'+req.get('host')+'/evalidate/?v='+req.session.isValidationRequired)
        );
    }
    res.redirect('/');
});


module.exports = { emailResendRouter };