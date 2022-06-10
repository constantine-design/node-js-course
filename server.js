const { app } = require('./app');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('srvPort');

mongoose.connect(config.get('dbConnectionString'))
    .then(()=> {
        app.listen( PORT, () => console.log(`Server started at http://localhost:${PORT}`) );
    }).catch(e=>{
        console.log('Connection ERROR:', e);
    });


