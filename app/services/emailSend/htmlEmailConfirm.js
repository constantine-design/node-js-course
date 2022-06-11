// html for the letter

const htmlEmailConfirmSubject = "Registration Confirmation";

const htmlEmailConfirm  = (validationLink) => {
    return `
        <h1>Register Confirmation</h1>
        <p>You registered at Chat App, please confirm your registeration by clicking on folwing link:<p/>
        <a href="${validationLink}"  target="_blank">${validationLink}</a>
    `;
}

module.exports = {
    htmlEmailConfirm,
    htmlEmailConfirmSubject
}