const chai = require('chai');
const sinon = require('sinon');
const {assert} = require("chai");
const { BadRequestError, UnprocessableEntityError } = require("../../../app/helpers/exceptions");
const apiUtil = require("../../apiCall");
const { TransportTypeService } = require('../../../app/services');

describe('TransportTypeService', () => {

    let apiStub;

    beforeEach(() => {
        apiStub = sinon.stub(TransportTypeService, "createTransportType");
       
        
    });

    afterEach(() => {
        apiStub.restore();
    });
   
    it("should throw an error BadRequestError", async () => {
        try {
            await  TransportTypeService.createTransportType();
            throw new BadRequestError("should return some info error");
        } catch (error) {
            assert.equal(error.status, false);          
            assert.equal(error.message, "should return some info error");          
        }       
    });

    it("should throw an error UnprocessableEntityError", async () => {
        try {
            await  TransportTypeService.createTransportType();
            throw new UnprocessableEntityError("should return some info error");
        } catch (error) {
            assert.equal(error.status, false);          
            assert.equal(error.message, "should return some info error");          
        }       
    });

    it("should return create success", async () => {
        try {
            apiStub.returns({
                "status": true,
                "message": "Success",
                "data": {
                    "id": 3,
                    "name": "xxx",
                    "description": null,
                    "status": true
                }
            });
            await TransportTypeService.createTransportType({
                name: "test",
                description: "tests",
            });
            // console.log('test', apiStub);
            assert.equal(apiStub.status, true);
            assert.equal(apiStub.message, 'Success');
            assert.equal(apiStub.data.id, 4);
            assert.equal(apiStub.data.name, "xx");
            assert.equal(apiStub.data.description, "description");
        } catch (e) {}       
    });

    it("should return update success", async () => {
        try {
            let test = await TransportTypeService.createTransportType(2, {
                name: "test",
                description: "test",
            });
            assert.equal(test.status, true);
            assert.equal(test.message, 'Success');
            assert.equal(test.data.name, 'test');
            assert.equal(test.data.description, "description");
        } catch (e) {}       
    });
})