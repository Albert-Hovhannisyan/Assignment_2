const rewire = require('rewire');
const citiesService = rewire('./cities.service');
const {faker} = require('@faker-js/faker');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const spies = require('chai-spies');
const NotFoundError = require('../common/errors/not-found.error');
chai.use(chaiAsPromised);
chai.use(spies);
chai.should();

let fake_result = faker.address.cityName() + ', ' + faker.address.stateAbbr() + ', ' +  faker.address.country();

citiesService.__set__('citiesRepository', {
    getCityDataByZipCode: async function(zipcode){ 
        if(zipcode == 1){
            return fake_result
        }
        else if(zipcode == 0){
            throw new Error('Error')
        }
    }
})

describe("Testing cities.service file.", function(){
    describe("Testing the getCityByZipCode function.", function(){

        it("Returns city by it's zipcode correctly.", function(){
            citiesService.getCityByZipCode(1).should.eventually.be.equal(fake_result);
        })

        it("Throws a correct error when something goes wrong.", function(){
            citiesService.getCityByZipCode(0).should.eventually.be.rejectedWith(NotFoundError);
        })

        it("Throws a correct message when something goes wrong.", function(){
            citiesService.getCityByZipCode(0).should.eventually.be.rejectedWith('No cities found!');
        })

        it("Is called exactly once.", function(){
            let spy = chai.spy(citiesService.getCityByZipCode(1));
            spy();
            spy.should.have.been.called.once;
        })
    })
});