const Sequelize = require('sequelize');
const { TransportType } = require('../../models/parkir-db')

module.exports = {
    save: async (payload) => {
        return await TransportType
        .create(payload)
        .then(data => data)
        .catch(err => err.message);
    },
    getById: async (id) => {
        return await TransportType
        .findByPk(id)
        .then(data => data)
        .catch(err => err.message);
    },
    getBy: async (where) => {
        return await TransportType
        .findAll({ where: where })
        .then(data => data)
        .catch(err => err.message);
    },
    getAll: async () => {
        return await TransportType
        .findAll({})
        .then(data => data)
        .catch(err => err.message);
    },
    update: async (payload, id) => {
        return await TransportType
        .update(payload, {where: { id: id } })
        .then(data => data)
        .catch(err => err.message);
    },
    remove: async (id) => {
        return await TransportType
        .destroy({where: { id: id } })
        .then(data => data)
        .catch(err => err.message);
    },
}