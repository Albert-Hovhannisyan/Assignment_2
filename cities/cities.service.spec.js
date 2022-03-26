const rewire = require('rewire');
const citiesService = rewire('./cities.service');
const {faker} = require('@faker-js/faker');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const NotFoundError = require('../common/errors/not-found.error');
chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

testObject = {
    country: faker.address.country(),
    places: [
        {
            'place name': faker.address.cityName(),
            'state abbreviation': faker.address.stateAbbr()
        }
    ]
};

describe("Testing cities.service file.", function(){
    describe("Testing the getCityByZipCode function.", function(){

        it("Returns city by it's zipcode correctly.", function(){


            citiesService.__set__('citiesRepository', {
                getCityDataByZipCode: async function(zipcode){  
                    return testObject.places[0]['place name'] + ', ' + 
                    testObject.places[0]['state abbreviation'] + ', ' +  
                    testObject.country
                }
            })

            citiesService.getCityByZipCode(11111).should.eventually.equal
            (testObject.places[0]['place name'] + ', ' + 
            testObject.places[0]['state abbreviation'] + ', ' +  
            testObject.country);
        })

        it("Throws an error if something goes wrong.", function(){
            citiesService.__with__('citiesRepository', {
                getCityDataByZipCode: async function(zipcode){
                    return new Promise.reject(new Error('Error!'))
                }
            })

            (() => citiesService.getCityByZipCode(-1)).should.eventually.throw(new NotFoundError('No cities found!'))
        })
    })
});