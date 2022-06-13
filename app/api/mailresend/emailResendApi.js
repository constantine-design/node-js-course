const { Router } = require('express');
const { User } = require('../../../models');
const { sendEmail, htmlEmailConfirm, htmlEmailConfirmSubject } = require('../../services/emailSend');
const { authenticateToken } = require('../../services/authenticateToken');

emailResendApi = Router();


emailResendApi.get('/', authenticateToken, (req, res)=>{
    if (req.userToken.user && req.userToken.email && req.userToken.isValidationRequired) {
        sendEmail(
            req.userToken.email,
            htmlEmailConfirmSubject,
            htmlEmailConfirm(req.protocol+'://'+req.get('host')+'/evalidate/?v='+req.userToken.isValidationRequired)
        );
        res.status(200).json({"result": true});
    } else {
        res.status(400).json({"result": false});
    }
});


module.exports = { emailResendApi };