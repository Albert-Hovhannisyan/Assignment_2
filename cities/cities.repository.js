const axios = require('axios');

citiesRepository = {
    getCityDataByZipCode: async function (zipcode){
        result = await axios.get(`https://api.zippopotam.us/us/${zipcode}`)
        return result.data.places[0]['place name'] + ', ' + 
               result.data.places[0]['state abbreviation'] + ', ' +  
               result.data.country;
    }
}

module.exports = citiesRepository;