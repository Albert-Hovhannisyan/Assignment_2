const citiesRepository = require('./cities.repository');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const assert = chai.assert;
const axios = require('axios');
chai.use(chaiAsPromised);
chai.should();

describe("Testing cities.repository file.", function(){
    describe("Testing the getCityDataByZipCode function.", function(){
        it("Returns data for a given zipcode correctly.", async function(){
            result = await citiesRepository.getCityDataByZipCode(94122);
            result.should.be.equal("San Francisco, CA, United States");
        })
    })
    
    describe("Testing the Axios.get.", function(){
        it("Axios.get returns data for a given zipcode correctly.", async function(){
            const stub = sinon.stub(axios, 'get').callsFake(() => Promise.resolve("San Francisco, CA, United States"));
            const test = await axios.get('https://api.zippopotam.us/us/94122');
            assert.deepEqual(test, "San Francisco, CA, United States" );
            assert.strictEqual(stub.callCount, 1);
        })
    })
    
});