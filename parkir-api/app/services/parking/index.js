const Validator = require('../../helpers/validateSchema');
const { ParkingSchema } = require('../../schemas');
const { ParkingRepository, TransportTypeRepository } = require('../../repositories');
const { UnprocessableEntityError, BadRequestError } = require('../../helpers/exceptions');
const { TimeLeft } = require('../../helpers/utils');
const clientTimezone = 'Asia/Jakarta'

const dayjs = require('dayjs');
// const utc = require('dayjs/plugin/utc');
// const timezone = require('dayjs/plugin/timezone');
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz(clientTimezone);

const dateFormat = 'YYYY-MM-DD hh:mm:ss'

module.exports = {
    createParking: async (payload) => {
        
        const data = await Validator.validateSchema(payload, ParkingSchema.POST);
        const isExist = await ParkingRepository.getByPlate(payload.plate, false);
        if (isExist && isExist.length > 0) {
            throw new UnprocessableEntityError('The transport need to clock out first!');
        }
        
        const type = await TransportTypeRepository.getById(payload.typeId);
        if (!type) throw new BadRequestError('Type Transport not found!');

        let newPayload = data;
        newPayload.clockIn = dayjs(newPayload.clockIn).format() || dayjs.format();
        newPayload.amount = 0;
        
        const result = await ParkingRepository.save(newPayload);
        if (!result) throw new BadRequestError('Type Transport not found!');

        return result;
    },
    getParking: async (id) => {
        const transportType = await ParkingRepository.getById(id);
        if (!transportType)  throw new BadRequestError('Type Transport is not found!');

        return transportType;
    },
    updateParking: async (id, payload) => {
        const data = await Validator.validateSchema(payload, ParkingSchema.PUT);
        const isExist = await ParkingRepository.getByPlate(payload.plate);

        if (!isExist) throw new BadRequestError('Type Transport not found!');
        
        return await ParkingRepository.update(id, data);
    },

    patchParking: async (id, payload) => {
        const data = await Validator.validateSchema(payload, ParkingSchema.PUT);
        const isExist = await ParkingRepository.getById(id);
        
        if (isExist && isExist.status) {
            const type = await TransportTypeRepository.getById(isExist.typeId);
    
            let newPayload = data;
            newPayload.clockOut = dayjs(data.clockOut).format() || dayjs.format();
            const lifeTime = TimeLeft(isExist.clockIn, data.clockOut)
            
            newPayload.amount = setPrice(lifeTime, type.name);
            return await ParkingRepository.update(newPayload, isExist.id);
        }else{
            throw new UnprocessableEntityError('The transport need to clock in first!');
        }
    },
    getParkings: async (payload = {}) => {
        const data = await Validator.validateSchema(payload, ParkingSchema.GET);
        console.log(data);
        return await ParkingRepository.findAdvance(data)
    },
    remove: async (id) => {
        return await ParkingRepository.remove(id);
    },
}

const setPrice = (lifeTime, type) => {
    const carPrice = 5000;
    const motorPrice = 2000;
    const pinalty = 3000;

    const oneDayCar = 16 * carPrice
    const oneDayMotor = 16 * motorPrice

    let finalPrice = 0
    const {days, hours, minutes, seconds} = lifeTime

    if (type === 'mobil') {
        if (days > 0) {
            finalPrice = (days * oneDayCar) + (hours * carPrice);
        }else {
            if (hours == 0) {
                finalPrice = carPrice;
            } else if (hours > 0 && minutes < 1) {
                finalPrice = hours * carPrice;
            } else if (hours > 0 && minutes > 0) {
                finalPrice = hours * carPrice + pinalty;
            }
        }
    } else if (type === "motor") {
        if (days > 0) {
            finalPrice = (days * oneDayMotor) + (hours * motorPrice);
        } else {
            if (hours == 0) {
                finalPrice = motorPrice;
            } else if (hours > 0 && minutes < 1) {
                finalPrice = hours * motorPrice;
            } else if (hours > 0 && minutes > 0) {
                finalPrice = hours * motorPrice + pinalty;
            }
        }
    }
    return finalPrice;
}