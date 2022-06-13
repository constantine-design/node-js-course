const { Router } = require('express');
const { User, Message } = require('../../../models');
const { authenticateToken } = require('../../services/authenticateToken');

chatApi = Router();

// get messages /api/chat msgto:user_to_chat returns all messages with user

chatApi.get('/', authenticateToken, async (req, res)=>{ 
    const allMessages = await Message.find({
        from: {$in: [req.userToken.user, req.body.msgto]}, 
        to: {$in: [req.userToken.user, req.body.msgto]}
    });
    res.status(200).json(allMessages);
});

// post new message /api/chat msgto:user_to_chat message:my_message returns mew message

chatApi.post('/', authenticateToken, async (req, res)=>{
    console.log(req.userToken.user, req.body.msgto, req.body.message);
    // check with if user to message selected exists and validated
    const userToSend = await User.findOne({login: req.body.msgto, isValidationRequired: ''});
    // send if all data exists
    if (userToSend && req.userToken.user) {
        const newMessage = new Message({
            from: req.userToken.user,
            to: userToSend.login,
            message: req.body.message
        });
        const result = await newMessage.save();
        res.status(200).json(result);
    } else {
        res.status(400).send("ERROR: Cant send message to this user");
    }
});


module.exports = { chatApi };