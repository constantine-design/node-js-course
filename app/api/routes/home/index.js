const { Router } = require('express');

homeRouter = Router();

homeRouter.get('/', (req, res)=>{
    res.render('home/index.ejs', { messages : '...HIDDEN CONTENT...' });
});

module.exports = { homeRouter };