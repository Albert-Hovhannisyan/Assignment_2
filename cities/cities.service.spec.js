const rewire = require('rewire');
const citiesService = rewire('./cities.service');
const {faker} = require('@faker-js/faker');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
expect = require('chai').expect
chai.use(chaiAsPromised);
chai.should();

testObject = {
    country: faker.address.country(),
    places: [
        {
            'place name': faker.address.cityName(),
            'state abbreviation': faker.address.stateAbbr()
        }
    ]
};

// testObject = {
//     country: "United States",
//     places: [
//         {
//             'place name': "San Francisco",
//             'state abbreviation': "CA"
//         }
//     ]
// };

citiesService.__set__('citiesRepository', {
    getCityDataByZipCode: async function(zipcode){ 
        if(zipcode == 1){
            return testObject.places[0]['place name'] + ', ' + 
            testObject.places[0]['state abbreviation'] + ', ' +  
            testObject.country
        }
        else if(zipcode == 0){
            throw new Error('Error')
        }
    }
})

describe("Testing cities.service file.", function(){
    describe("Testing the getCityByZipCode function.", function(){

        it("Returns city by it's zipcode correctly.", async function(){
            await citiesService.getCityByZipCode(1).should.eventually.be.equal(testObject.places[0]['place name'] + ', ' + 
                                                                               testObject.places[0]['state abbreviation'] + ', ' +  
                                                                               testObject.country);
        })

        it("Throws an error with correct message when something goes wrong.", async function(){
            await expect(citiesService.getCityByZipCode(0)).to.be.rejectedWith('No cities found!')
        })
    })
});