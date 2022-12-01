const Validator = require('../../helpers/validateSchema');
const { TransportTypeSchema } = require('../../schemas');
const { TransportTypeRepository } = require('../../repositories');
const { UnprocessableEntityError, BadRequestError } = require('../../helpers/exceptions');

module.exports = {
    createTransportType: async (payload) => {
        const dataType = await Validator.validateSchema(payload, TransportTypeSchema.POST);
        const isExist = await TransportTypeRepository.getBy({name: payload.name});
        if (isExist && isExist.length > 0 ) {
            throw new UnprocessableEntityError('Type Transport is already exist!');
        }
        
        return await TransportTypeRepository.save(dataType);
    },
    getTransportType: async (id) => {
        const transportType = await TransportTypeRepository.getById(id);
        if (!transportType) {
            throw new BadRequestError('Type Transport is not found!');
        }
        return transportType;
    },
    updateTransportType: async (id, payload) => {
        const dataType = await Validator.validateSchema(payload, TransportTypeSchema.PUT);
        const isExist = await TransportTypeRepository.getById(id);
        if (!isExist) {
            throw new BadRequestError('Type Transport not found!');
        }
        
        return await TransportTypeRepository.update(dataType, id);
    },
    getTransportTypes: async () => {
        const types = await TransportTypeRepository.getAll();
        if (types && types.length === 0 ) {
            throw new BadRequestError('Type transport not found!');
        }
        return types;
    },
    remove: async (id) => {
        return await TransportTypeRepository.remove(id)
    },
}