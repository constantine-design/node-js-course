const { Router } = require('express');

logOut = Router();


logOut.get('/', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
});


module.exports = { logOut };