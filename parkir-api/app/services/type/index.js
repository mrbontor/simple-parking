const Validator = require('../../helpers/validateSchema');
const { TransportTypeSchema } = require('../../schemas');
const { TransportTypeRepository } = require('../../repositories');
const { UnprocessableEntityError, NotFoundError } = require('../../helpers/exceptions');

module.exports = {
    createTransportType: async (payload) => {
        const dataType = await Validator.validateSchema(payload, TransportTypeSchema.POST);
        const isExist = await TransportTypeRepository.getBy({name: payload.name});
        console.log(isExist);
        if (isExist && isExist.length > 0 ) {
            throw new UnprocessableEntityError('Type Transport is already exist!');
        }
        
        return await TransportTypeRepository.save(dataType);
    },
    getTransportType: async (id) => {
        const transportType = await TransportTypeRepository.getById(id);
        if (!transportType) {
            throw new NotFoundError('Type Transport is not found!');
        }
        return transportType;
    },
    updateTransportType: async (id, payload) => {
        const dataType = await Validator.validateSchema(payload, TransportTypeSchema.PUT);
        const isExist = await TransportTypeRepository.getById(id);
        if (!isExist) {
            throw new NotFoundError('Type Transport not found!');
        }
        
        return await TransportTypeRepository.update(dataType, id);
    },
    getTransportTypes: async () => {
        const types = await TransportTypeRepository.getAll();
        if (types && types.length === 0 ) {
            throw new NotFoundError('Type transport not found!');
        }
        return types;
    },
    remove: async (id) => {
        return await TransportTypeRepository.remove(id)
    },
}