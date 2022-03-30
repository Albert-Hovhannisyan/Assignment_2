const citiesRepository = require('./cities.repository');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const spies = require('chai-spies');
const sinon = require('sinon')
const axios = require('axios');
chai.use(chaiAsPromised);
chai.use(spies);
chai.should();

describe("Testing cities.repository file.", function(){

    const obj ={
        data : {
            country: "United States",
            places: [
                {
                    'place name': "San Francisco",
                    'state abbreviation': "CA"
                }
            ]
        }
    };

    describe("Testing the getCityDataByZipCode function.", function(){
            it("Returns data for a given zipcode correctly.", async function(){
                
                sinon.stub(axios, 'get').returns(obj)
                result = await citiesRepository.getCityDataByZipCode(1)
                result.should.be.equal("San Francisco, CA, United States");
                spy = chai.spy(citiesRepository.getCityDataByZipCode(1))
                spy();
                spy.should.have.been.called.once;
            })
        })
});