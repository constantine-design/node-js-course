const { Router } = require('express');
const bp = require('body-parser');
const Joi = require('joi');
const { send } = require('express/lib/response');
const { loginProvider } = require('../../logins');
const { formSchema } = require('../../validate');

registerRouter = Router();
registerRouter.use(bp.json());
registerRouter.use(bp.urlencoded({ extended: true }));

registerRouter.get('/', (req, res)=>{
    res.render('register/index.ejs', { errorMessage: false });
});

registerRouter.post('/', async (req, res)=>{
  
    const result = formSchema.validate(req.body);

    if (!result.error) {
        await loginProvider.setItem({ 
            login: req.body.login, 
            password: req.body.password,
            email: req.body.email,
            birth: req.body.birth,
        });
        req.session.user = req.body.login;
        res.redirect('/');
    } else {
        res.render('register/index.ejs', { errorMessage: result.error.details[0].message });
    }
});


module.exports = { registerRouter };