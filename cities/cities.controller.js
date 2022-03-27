const express = require('express');
const citiesService = require('./cities.service');
const asyncHandler = require('express-async-handler');
const BadRequestError = require('../common/errors/bad-request.error');

const route = express.Router();

route.get('/:zipCode/', asyncHandler(async (req, res) => {
    const zipcode = req.params['zipCode'];

    if(isNaN(zipcode) || zipcode <= 0){
        throw new BadRequestError('Please enter a valid zipcode using numbers!');
    }

    const result = await citiesService.getCityByZipCode(zipcode);
    res.status(200).send(result);
}))

module.exports = route;
