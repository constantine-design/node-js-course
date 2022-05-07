const { Router } = require('express');
const bp = require('body-parser');
const { send } = require('express/lib/response');

logOut = Router();
logOut.use(bp.json());
logOut.use(bp.urlencoded({ extended: true }));

logOut.get('/', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
});

module.exports = { logOut };