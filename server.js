const http = require('http');
const { app } = require('./app');
const config = require('config');
const mongoose = require('mongoose');
const { socketsChat } = require('./sockets');

const PORT = process.env.PORT || config.get('srvPort');

// create http server
const server = http.Server(app);

// connect socket
const io = require('socket.io')(server);
socketsChat(io); // add chat socket

mongoose.connect(config.get('dbConnectionString'))
    .then( () => server.listen( PORT, (token) => console.log(`Server started at http://localhost:${PORT}`) ) )
    .catch( e => console.log('Connection ERROR:', e) );