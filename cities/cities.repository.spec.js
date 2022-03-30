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

    describe("Testing the axios.get of getCityDataByZipCode function.", function(){
            it("Returns data for a given zipcode correctly and is called exactly once.", async function(){             
                sinon.stub(axios, 'get').returns(obj)
                spy = chai.spy.on(axios, 'get');
                result = await citiesRepository.getCityDataByZipCode(1)
                result.should.be.equal("San Francisco, CA, United States");
                spy.should.have.been.called.once;
            })
        })
});