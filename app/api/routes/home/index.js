const { Router } = require('express');
const bp = require('body-parser');
const { send } = require('express/lib/response');

homeRouter = Router();
homeRouter.use(bp.json());
homeRouter.use(bp.urlencoded({ extended: true }));

homeRouter.get('/', (req, res)=>{
    res.render('home/index.ejs', { messages : '...HIDDEN CONTENT...' });
});

module.exports = { homeRouter };