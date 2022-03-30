const express = require('express');
const citiesService = require('./cities.service');
const asyncHandler = require('express-async-handler');

const route = express.Router();

route.get('/:zipCode/', asyncHandler(async (req, res) => {
    const zipcode = req.params['zipCode'];
    const result = await citiesService.getCityByZipCode(zipcode);
    res.status(200).send(result);
}))

module.exports = route;
