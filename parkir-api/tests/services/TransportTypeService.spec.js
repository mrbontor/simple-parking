const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { TransportTypeService } = require('../../app/services');
const { TransportTypeRepository } = require('../../app/repositories');
const Validator = require('../../app/helpers/validateSchema');
const { BadRequestError, UnprocessableEntityError } = require("../../app/helpers/exceptions");


describe('UserService', function () {
    describe('create', function () {
        let stubValue = {
            "name": "test",
            "description": null,
            "status": true
        };
        const { name } = stubValue;

        let apiStub, validatorStub, repositoryStub;
        let response = {};
        let payload = {};

        beforeEach(async () => {
            validatorStub = sinon.stub(Validator, 'validateSchema');
            repositoryStub = sinon.stub(TransportTypeRepository, 'getBy');
            apiStub = sinon.stub(TransportTypeService, "createTransportType");

            payload = await Validator.validateSchema(stubValue)            
        });
    
        afterEach(() => {
            validatorStub.restore();
            repositoryStub.restore();
            apiStub.restore();
        });

        it('should create a new type transport', async () => {
            stubValue.id = 1

            validatorStub.returns(stubValue)
            repositoryStub.returns(stubValue)
            apiStub.returns(stubValue)
            await TransportTypeRepository.getBy(name)
            response = await TransportTypeService.createTransportType(payload);

            expect(validatorStub.calledOnce).to.be.true;
            expect(repositoryStub.calledOnce).to.be.true;
            expect(response.id).to.equal(stubValue.id);
            expect(response.name).to.equal(stubValue.name);
            expect(response.description).to.equal(stubValue.description);
            expect(response.status).to.equal(stubValue.status);
        });

        it('should failed if name exist', async () => {
            try {
                stubValue.id = 1
                stubValue.status = false

                validatorStub.returns(stubValue)
                repositoryStub.returns(stubValue)
                await TransportTypeRepository.getBy(name)

                throw new UnprocessableEntityError("should return some info error");

            } catch (error) {
                expect(error.status).to.equal(false);          
                expect(error.message).to.equal("should return some info error");          
            }
        });

        it('should failed to create a new type transport', async () => {
            stubValue = {}

            validatorStub.returns(stubValue)
            apiStub.returns(stubValue)

            response = await TransportTypeService.createTransportType(payload);
            
            expect(validatorStub.calledOnce).to.be.true;
            expect(repositoryStub.calledOnce).to.be.false;            
        });
    });

    describe('get one', function () {
        let stubValue = {
            "id": 1,
            "name": "test",
            "description": null,
            "status": true
        };
        let apiStub, repositoryStub;
        let response = {};
        
        beforeEach(async () => {
            repositoryStub = sinon.stub(TransportTypeRepository, 'getById');
            apiStub = sinon.stub(TransportTypeService, "getTransportType");        
        });
    
        afterEach(() => {
            repositoryStub.restore();
            apiStub.restore();
        });

        it('should return info type transport', async () => {
            repositoryStub.returns(stubValue)
            apiStub.returns(stubValue)
            
            await TransportTypeRepository.getById(1)
            response = await TransportTypeService.getTransportType(1);

            expect(repositoryStub.calledOnce).to.be.true;
            expect(response.id).to.equal(stubValue.id);
            expect(response.name).to.equal(stubValue.name);
            expect(response.description).to.equal(stubValue.description);
            expect(response.status).to.equal(stubValue.status);
        });

        it('should throw error if name exist', async () => {
            try {
                stubValue.id = 1
                stubValue.status = false

                await TransportTypeService.getTransportType(1000);
                throw new BadRequestError("should return some info error");

            } catch (error) {
                expect(error.status).to.equal(false);          
                expect(error.message).to.equal("should return some info error");          
            }
        });
    });
});
