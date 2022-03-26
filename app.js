const citiesController = require('./cities/cities.controller');
const errorHandler = require('./common/middlewares/error-handler.middleware');
const express = require('express');
const app = express();
const port = 3000;

app.use('/cities', citiesController);

app.listen(port, () => {
    console.log(`Srever is running on port ${port}`);
});

app.use(errorHandler);