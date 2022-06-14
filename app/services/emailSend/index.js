const { sendEmail } = require ('./sendEmail');
const { htmlEmailConfirm, htmlEmailConfirmSubject } = require ('./htmlEmailConfirm');

module.exports = {
    sendEmail,
    htmlEmailConfirm,
    htmlEmailConfirmSubject
}