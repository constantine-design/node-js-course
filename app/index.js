const express = require('express');
const session = require('express-session');
const path = require('path');

const { homeRouter } = require('./api/routes/home');
const { registerRouter } = require('./api/routes/register');
const { loginRouter } = require('./api/routes/login');
const { usersRouter } = require('./api/routes/users');
const { logOut } = require('./api/routes/logout');

const app = express();
app.set('view engine', 'ejs');

app.use(session({
    secret: 'Hfdk-jF5h-d3kd-72j9',
    resave: true,
    saveUninitialized: true
}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// routes
app.use('/', homeRouter);
app.use('/public', express.static(path.join(__dirname,'..','public')));
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/logout', logOut);



module.exports = { app };