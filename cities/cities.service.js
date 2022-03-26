const citiesRepository = require('./cities.repository');
const errorHandler = require('express-async-handler');
const NotFoundError = require('../common/errors/not-found.error');

citiesService = {getCityByZipCode: errorHandler(async function (zipcode) {
    try{
        result = await citiesRepository.getCityDataByZipCode(zipcode);
    }
    catch(err){
        throw new NotFoundError('No cities found!');
    }

    return result;
    })
};

module.exports = citiesService;
