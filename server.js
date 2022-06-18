const http = require('http');
const { app } = require('./app');
const config = require('config');
const mongoose = require('mongoose');

const PORT = process.env.PORT || config.get('srvPort');

// create http server
const server = http.Server(app);

mongoose.connect(config.get('dbConnectionString'))
    .then(()=> {
        server.listen( PORT, (token) => console.log(`Server started at http://localhost:${PORT}`) );
    }).catch(e=>{
        console.log('Connection ERROR:', e);
    });


const io = require('socket.io')(server);

const { User, Message } = require('./models');
io.on('connection', socket => {

    // joining rooms for both chat sides getting data from frontend
    socket.on('join', (payload) => {
        const roomMyMsg = payload.from;
        const roomMsgTo = payload.to;
        socket.join([roomMyMsg, roomMsgTo]);
    });
    
    // updating message both sides
    socket.on('onUpdate:client', async (payload) => {
        const roomMyMsg = payload.from;
        const roomMsgTo = payload.to;
        // check with if user to message selected exists and validated 
        // (do this check because user can change get data in browser)
        const userToSend = await User.findOne({login: payload.to, isValidationRequired: ''});
        // send if all data exists
        if (userToSend && payload.from && payload.message) {
            const newMessage = new Message({
                from: payload.from,
                to: payload.to,
                message: payload.message
            });
            // 
            const newMsg = await newMessage.save();
            // replace date to readable format
            const modMsgDate = new Date(newMsg.date);
            const newPayload = {
                from: newMsg.from,
                to: newMsg.to,
                message: newMsg.message,
                date: modMsgDate.toLocaleTimeString()
            };
            // sending messages to sender and receiver rooms
            io.to(roomMyMsg).to(roomMsgTo).emit('onUpdate:server', newPayload);
        }
    });

});
