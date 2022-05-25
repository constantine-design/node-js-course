const { Router } = require('express');

homeRouter = Router();

homeRouter.get('/', async (req, res)=>{
    res.render('home/index.ejs', { messages : '...HIDDEN CONTENT...' });
});

module.exports = { homeRouter };