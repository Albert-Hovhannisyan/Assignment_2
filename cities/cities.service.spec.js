const rewire = require('rewire');
const citiesService = rewire('./cities.service');
const {faker} = require('@faker-js/faker');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const NotFoundError = require('../common/errors/not-found.error');
chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const wrongObject = () => {throw new Error("Error")}

describe("Testing cities.service file.", function(){
    describe("Testing the getCityByZipCode function.", function(){

        it("Returns city by it's zipcode correctly.", function(){

            testObject = {
                country: faker.address.country(),
                places: [
                    {
                        'place name': faker.address.cityName(),
                        'state abbreviation': faker.address.stateAbbr()
                    }
                ]
            };

            citiesService.__set__('citiesRepository', {
                getCityDataByZipCode: async function(zipcode){    
                    return testObject.places[0]['place name'] + ', ' + 
                    testObject.places[0]['state abbreviation'] + ', ' +  
                    testObject.country}
            })

            citiesService.getCityByZipCode(11111).should.eventually.be.equal
            (testObject.places[0]['place name'] + ', ' + 
            testObject.places[0]['state abbreviation'] + ', ' +  
            testObject.country);
        })

        // it("Returns city by it's zipcode correctly.", function(){
        //     citiesService.__set__('citiesRepository', {
        //         getCityDataByZipCode: async function(zipcode){
        //             //return wrongObject();
        //             return new Promise((resolve, reject) => {
        //                 reject(new NotFoundError('No cities found!'))
        //             });
        //             // throw new NotFoundError("Error")
        //         }
        //     })

            //expect(() => citiesService.getCityByZipCode(-1)).to.throw(new NotFoundError('No cities found!'))
            // (() => citiesService.getCityByZipCode(-1)).should.throw(new NotFoundError('No cities found!'))
        // })
    })
});