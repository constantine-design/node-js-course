const { Router } = require('express');
const { User } = require('../../../../models');

loginRouter = Router();

loginRouter.get('/', (req, res)=>{
    res.render('login/index.ejs', { errorMessage: false });
});

loginRouter.post('/', async (req, res)=>{
    let query = await User.findOne({login: req.body.login})
        .exec((err, user)=>{
            if (user) {
                if (user.password && user.password === req.body.password) {
                    req.session.user = user.login;
                    res.redirect('/');
                } else {
                    res.render('login/index.ejs', { errorMessage: "Password incorrect" });
                }
            } else {
                res.render('login/index.ejs', { errorMessage: "Login incorrect" });
            }
        });
});

module.exports = { loginRouter };