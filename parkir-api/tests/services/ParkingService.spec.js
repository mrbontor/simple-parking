const chai = require('chai');
const expect = chai.expect;

const chaiaspromise = require('chai-as-promised');
chai.use(chaiaspromise);
const sinon = require('sinon');

const { TransportTypeService } = require('../../app/services');
const { TransportTypeRepository } = require('../../app/repositories');
const { TransportTypeSchema } = require('../../app/schemas');

const Validator = require('../../app/helpers/validateSchema');

const mockType = require('../mocks/type');
let ID = 1;
describe('TransportTypeService.spec', function () {
    let validatorStub, getByStub, saveStub, getByIdStub, getAllStub, updateStub;
    let response = {};

    let payload = {
        name: 'motor',
        description: 'motor',
    };
    beforeEach(async () => {
        validatorStub = sinon.spy(Validator, 'validateSchema');
        getByStub = sinon.stub(TransportTypeRepository, 'getBy');
        getByIdStub = sinon.stub(TransportTypeRepository, 'getById');
        saveStub = sinon.stub(TransportTypeRepository, 'save');
        updateStub = sinon.stub(TransportTypeRepository, 'update');
        deleteStub = sinon.stub(TransportTypeRepository, 'remove');
        getAllStub = sinon.stub(TransportTypeRepository, 'getAll');
    });

    afterEach(() => {
        validatorStub.restore();
        getByStub.restore();
        saveStub.restore();
        getByIdStub.restore();
        getAllStub.restore();
        updateStub.restore();
        deleteStub.restore();
    });

    describe('Create Type Transport', () => {
        it('Success create', async () => {
            saveStub.returns(mockType[0]);

            response = await TransportTypeService.createTransportType(payload);
            expect(validatorStub.calledOnce).to.be.true;
            expect(getByStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;

            expect(response).to.have.property('id').to.equal(1);
            expect(response).to.have.property('name').to.equal(payload.name);
            expect(response).to.have.property('description').to.equal(payload.description);
            expect(response).to.have.property('status').to.be.true;
        });

        it('Validation Error', async () => {
            payload = {};
            try {
                await TransportTypeService.createTransportType(payload);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });

        it('Validation Error', async () => {
            payload.name = 'tets';
            try {
                await TransportTypeService.createTransportType(payload);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.errors[0].message).to.equal('Only allowed for mobil and motor');
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });
    });

    describe('Get One ', function () {
        it('Success GET', async () => {
            getByIdStub.returns(mockType[0]);
            response = await TransportTypeService.getTransportType(ID);

            expect(getByIdStub.calledOnce).to.be.true;

            expect(response).to.have.property('id').to.equal(1);
            expect(response).to.have.property('name').to.equal('motor');
            expect(response).to.have.property('description').to.equal('motor');
            expect(response).to.have.property('status').to.be.true;
        });

        it('Error Not found', async () => {
            ID = 'error';
            try {
                await TransportTypeService.getTransportType(ID);
            } catch (error) {
                expect(getByIdStub.calledOnce).to.be.true;

                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Type Transport is not found!');
            }
        });
    });

    describe('Get All ', function () {
        it('Success GET', async () => {
            getAllStub.returns(mockType);

            response = await TransportTypeService.getTransportTypes();

            expect(getAllStub.calledOnce).to.be.true;
            expect(response).to.have.to.have.length(2);
        });

        it('Error Not found', async () => {
            getAllStub.returns([]);
            try {
                await await TransportTypeService.getTransportTypes();
            } catch (error) {
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Type transport not found!');
            }
        });
    });

    let payloadUpdate = {
        name: 'motor',
        description: 'motor',
    };

    describe('Update Type Transport', () => {
        it('Success Update', async () => {
            getByIdStub.returns(mockType[0]);
            updateStub.returns();

            response = await TransportTypeService.updateTransportType(ID, payloadUpdate);

            expect(validatorStub.calledOnce).to.be.true;
            expect(getByIdStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;
        });

        it('Validation Error', async () => {
            payloadUpdate = {};
            try {
                await TransportTypeService.updateTransportType(ID, payloadUpdate);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByIdStub.calledOnce).to.be.false;
                expect(updateStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });

        it('Validation Error', async () => {
            payloadUpdate.name = 'tets';
            try {
                await TransportTypeService.updateTransportType(ID, payloadUpdate);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByIdStub.calledOnce).to.be.false;
                expect(updateStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.errors[0].message).to.equal('Only allowed for mobil and motor');
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });
    });

    describe('Delete Type Transport', function () {
        it('Success D', async () => {
            deleteStub.returns();
            response = await TransportTypeService.remove(ID);

            expect(deleteStub.calledOnce).to.be.true;
        });

        it('Error Not found', async () => {
            ID = 'error';
            try {
                await TransportTypeService.remove(ID);
            } catch (error) {
                console.log(error);
                expect(deleteStub.calledOnce).to.be.true;

                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Type Transport is not found!');
            }
        });
    });
});
