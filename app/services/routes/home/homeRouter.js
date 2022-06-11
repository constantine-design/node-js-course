const { Router } = require('express');
const { User, Message } = require('../../../models');

homeRouter = Router();

homeRouter.get('/', async (req, res)=>{
    const allMessages = await Message.find({from: {$in: [req.session.user, req.query.msgto]}, to: {$in: [req.session.user, req.query.msgto]}});
    const allUsers = await User.find({isValidationRequired: '', login: {$ne : req.session.user}});
    res.render('home/index.ejs', { messages : allMessages, users: allUsers, usertochat: req.query.msgto });
});

homeRouter.post('/', async (req, res)=>{
    // check with if user to message selected exists and validated
    const userToSend = await User.findOne({login: req.query.msgto, isValidationRequired: ''});
    // send if all data exists
    if (userToSend && req.session.user) {
        const newMessage = new Message({
            from: req.session.user,
            to: userToSend.login,
            message: req.body.message
        });
        await newMessage.save();
    }
    // if user ok redirect with parameter
    const parameter = userToSend ? "?msgto="+req.query.msgto : '';
    res.redirect('/'+parameter);
});

module.exports = { homeRouter };