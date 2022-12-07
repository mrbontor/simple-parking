const Sequelize = require('sequelize');
const { TransportType } = require('../../models/parkir-db')
const { UnprocessableEntityError, BadRequestError, NotFoundError, ApplicationError } = require('../../helpers/exceptions');
module.exports = {
    save: async (payload) => {
        try {
            return await TransportType.create(payload)            
        } catch (error) {
            throw new NotFoundError('Something went wrong')
        }
    },
    getById: async (id) => {
        try {
            return await TransportType.findByPk(id)            
        } catch (error) {
            throw new NotFoundError('Data not found!')
        }
    },
    getBy: async (where) => {
        try {
            return await TransportType.findAll({ where: where })            
        } catch (error) {
            throw new NotFoundError('Data not found!')
        }
    },
    getAll: async () => {
        try {
            return await TransportType.findAll({})            
        } catch (error) {
            throw new NotFoundError('Data not found!')
        }
    },
    update: async (payload, id) => {
        try {
            return await TransportType.update(payload, {where: { id: id } })            
        } catch (error) {
            throw new NotFoundError('Data not found!')
        }
    },
    remove: async (id) => {
        try {
            return await TransportType.destroy({where: { id: id } })            
        } catch (error) {
            throw new NotFoundError('Data not found!')
        }
    },
}