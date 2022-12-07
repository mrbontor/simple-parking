const chai = require('chai');
const expect = chai.expect;

const chaiaspromise = require('chai-as-promised');
chai.use(chaiaspromise);
const sinon = require('sinon');

const { ParkingService } = require('../../app/services');
const { ParkingRepository, TransportTypeRepository } = require('../../app/repositories');
const { ParkingSchema } = require('../../app/schemas');

const Validator = require('../../app/helpers/validateSchema');

const mockParking = require('../mocks/parking');
const mockType = require('../mocks/type');
let ID = 2;

describe('ParkingService.spec', function () {
    let validatorStub, getByPlateStub, saveStub, getByIdStub, getByIdTypeStub, getAllStub, updateStub;
    let response = {};

    let payload = {
        typeId: 2,
        plate: 'AC 1234 MBL',
        color: 'black',
        clockIn: '2022-11-02 10:10:10',
    };
    beforeEach(async () => {
        validatorStub = sinon.spy(Validator, 'validateSchema');
        getByPlateStub = sinon.stub(ParkingRepository, 'getByPlate');
        getByIdTypeStub = sinon.stub(TransportTypeRepository, 'getById');
        saveStub = sinon.stub(ParkingRepository, 'save');

        getByIdStub = sinon.stub(ParkingRepository, 'getById');
        getAllStub = sinon.stub(ParkingRepository, 'findAdvance');
        updateStub = sinon.stub(ParkingRepository, 'update');
        deleteStub = sinon.stub(ParkingRepository, 'remove');
    });

    afterEach(() => {
        validatorStub.restore();
        getByPlateStub.restore();
        getByIdTypeStub.restore();
        saveStub.restore();

        getByIdStub.restore();
        getAllStub.restore();
        updateStub.restore();
        deleteStub.restore();
    });

    describe('Create Type Transport', () => {
        it('Success create', async () => {
            saveStub.returns(mockParking[1]);
            getByIdTypeStub.returns(mockType[1]);

            response = await ParkingService.createParking(payload);

            expect(validatorStub.calledOnce).to.be.true;
            expect(getByPlateStub.calledOnce).to.be.true;
            expect(getByIdTypeStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;

            expect(response).to.have.property('id').to.equal(2);
            expect(response).to.have.property('plate').to.equal(payload.plate);
            expect(response).to.have.property('typeId').to.equal(payload.typeId);
            expect(response).to.have.property('clockIn').to.equal(new Date(payload.clockIn).toISOString());
            expect(response).to.have.property('clockOut').to.equal(null);
            expect(response).to.have.property('status').to.be.true;
        });

        it('Type notFoundError Error', async () => {
            getByIdTypeStub.returns(null);
            try {
                await ParkingService.createParking({
                    typeId: 3,
                    plate: 'AC 1234 MBL',
                    color: 'black',
                    clockIn: '2022-11-02 10:10:10',
                });
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByPlateStub.calledOnce).to.be.true;
                expect(saveStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Type Transport not found!');
            }
        });

        it('Validation Error', async () => {
            try {
                await ParkingService.createParking({});
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByPlateStub.calledOnce).to.be.false;
                expect(getByIdTypeStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });
    });

    describe('Get One ', function () {
        it('Success GET', async () => {
            getByIdStub.returns(mockParking[1]);
            response = await ParkingService.getParking(ID);

            expect(getByIdStub.calledOnce).to.be.true;

            expect(response).to.have.property('id').to.equal(2);
            expect(response).to.have.property('plate').to.equal(payload.plate);
            expect(response).to.have.property('typeId').to.equal(payload.typeId);
            expect(response).to.have.property('clockIn').to.equal(new Date(payload.clockIn).toISOString());
            expect(response).to.have.property('clockOut').to.equal(null);
            expect(response).to.have.property('status').to.be.true;
        });

        it('Error Not found', async () => {
            ID = 'error';
            try {
                await ParkingService.getParking(ID);
            } catch (error) {
                expect(getByIdStub.calledOnce).to.be.true;

                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Parkir Id is not found!');
            }
        });
    });

    describe('Get All ', function () {
        it('Success GET', async () => {
            getAllStub.returns(mockParking);

            response = await ParkingService.getParkings();

            expect(getAllStub.calledOnce).to.be.true;
            expect(response).to.have.to.have.length(2);
        });

        it('Error Not found', async () => {
            getAllStub.returns([]);
            try {
                await await ParkingService.getParkings();
            } catch (error) {
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('No data');
            }
        });
    });

    let payloadUpdate = {
        clockOut: '2022-11-20 18:00:00',
    };

    describe('Update Status Parking', () => {
        ID = 2;
        let dataUpdated = {
            id: 2,
            plate: 'AC 1234 MBL',
            typeId: 2,
            clockIn: '2022-11-02T03:10:10.000Z',
            clockOut: new Date(payloadUpdate.clockOut).toISOString(),
            amount: 0,
            description: 'this is for create',
            status: true,
            type: {
                type_id: 2,
                name: 'mobil',
            },
        }
        it('Success Update', async () => {
            updateStub.returns(dataUpdated);
            getByIdStub.returns(mockParking[1]);
            getByIdTypeStub.returns(mockType[1]);

            response = await ParkingService.patchParking(ID, payloadUpdate);
            expect(validatorStub.calledOnce).to.be.true;
            expect(getByIdStub.calledOnce).to.be.true;
            expect(getByIdTypeStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;

            expect(response).to.have.property('id').to.equal(2);
            expect(response).to.have.property('plate').to.equal(dataUpdated.plate);
            expect(response).to.have.property('typeId').to.equal(dataUpdated.typeId);
            expect(response).to.have.property('clockIn').to.equal(dataUpdated.clockIn);
            expect(response).to.have.property('clockOut').to.equal(new Date(payloadUpdate.clockOut).toISOString());
            expect(response).to.have.property('status').to.be.true;
        });

        it('Validation Error', async () => {
            try {
                await ParkingService.patchParking(ID, {});
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByIdStub.calledOnce).to.be.false;
                expect(getByIdTypeStub.calledOnce).to.be.false;
                expect(updateStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });

        it('Validation Error', async () => {
            getByIdStub.returns({});
            try {
                await ParkingService.patchParking('', {
                    clockOut: '2022-11-20 18:00:00',
                });
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByIdStub.calledOnce).to.be.true;
                expect(getByIdTypeStub.calledOnce).to.be.false;
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
            getByIdStub.returns(mockParking[0]);
            deleteStub.returns();
            response = await ParkingService.remove(1);

            expect(getByIdStub.calledOnce).to.be.true;
            expect(deleteStub.calledOnce).to.be.true;
        });

        it('Cant Delete UnprocessableEntityError', async () => {
            ID = 'error';
            try {
                getByIdStub.returns(mockParking[1]);
                deleteStub.returns();
                await ParkingService.remove(2);
            } catch (error) {
                expect(getByIdStub.calledOnce).to.be.true;
                expect(deleteStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(422);
                expect(error.message).to.equal('Sorry, you cant remove this, the transport still inside!');
            }
        });

        it('Error Not found', async () => {
            try {
                getByIdStub.returns({});
                await ParkingService.remove(5);
            } catch (error) {
                expect(getByIdStub.calledOnce).to.be.true;
                expect(deleteStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Parkir Id is not found!');
            }
        });       
    });
});
