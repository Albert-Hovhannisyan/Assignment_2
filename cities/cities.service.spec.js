const rewire = require('rewire');
const citiesService = rewire('./cities.service');
const {faker} = require('@faker-js/faker');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const NotFoundError = require('../common/errors/not-found.error');
const {expect} = require('chai');
chai.use(chaiAsPromised);
chai.should();

// testObject = {
//     country: faker.address.country(),
//     places: [
//         {
//             'place name': faker.address.cityName(),
//             'state abbreviation': faker.address.stateAbbr()
//         }
//     ]
// };

let result = faker.address.cityName() + ', ' + faker.address.stateAbbr() + ', ' +  faker.address.country()

citiesService.__set__('citiesRepository', {
    getCityDataByZipCode: async function(zipcode){ 
        if(zipcode == 1){
            return result
        }
        else if(zipcode == 0){
            throw new Error('Error')
        }
    }
})

describe("Testing cities.service file.", function(){
    describe("Testing the getCityByZipCode function.", function(){

        it("Returns city by it's zipcode correctly.", async function(){
            await citiesService.getCityByZipCode(1).should.eventually.be.equal(result);
        })

        it("Throws a correct error when something goes wrong.", async function(){
            await expect(citiesService.getCityByZipCode(0)).to.eventually.be.rejectedWith(NotFoundError)
        })

        it("Throws a correct message when something goes wrong.", async function(){
            await expect(citiesService.getCityByZipCode(0)).to.eventually.be.rejectedWith('No cities found!')
        })
    })
});