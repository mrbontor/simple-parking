const dayjs = require('dayjs');
const { Op } = require('sequelize');
const { Parking, TransportType } = require('../../models/parkir-db/')

module.exports = {
    save: async (payload) => {
        return await Parking
        .create(payload)
        .then(data => data.dataValues)
        .catch(err => err.message);
    },
    getByPlate: async (plate, status) => {
        return await Parking
        .findAll({
            where: { plate: plate, status: status },
            order: [ [ 'id', 'DESC' ]],
        })
        .then(data => data)
        .catch(err => err.message);
    },

    getBy: async (plate, where) => {
        return await Parking
        .findAll({
            where: where,
            order: [ [ 'id', 'DESC' ]],
        })
        .then(data => data)
        .catch(err => err.message);
    },
    
    getById: async (id) => {
        return await Parking
        .findByPk(id)
        .then(data => data)
        .catch(err => err.message);
    },
    getAll: async () => {
        return await Parking
        .findAll({})
        .then(data => data)
        .catch(err => err.message);
    },
    update: async (payload, id) => {
        return await Parking
        .update(payload, {where: { id: id } })
        .then(data => data)
        .catch(err => err.message);
    },
    remove: async (id) => {
        return await Parking
        .destroy({where: { id: id } })
        .then(data => data)
        .catch(err => err.message);
    },
    findAdvance: async (payload) => {
        let condition = [];

        let conditionType = {
            attributes: [['id', 'type_id'], 'name'],
            model: TransportType,
            as: 'type',
            required: true
        }
        if( typeof payload.type !== 'undefined' ){
            conditionType.where = { name: { [Op.in] : payload.type.split(',')} }
        }
        condition = [conditionType]
        let filter = {}
        if (typeof payload.startDate !== 'undefined' && typeof payload.endDate !== 'undefined') {
            filter.clockIn = {
                [Op.between]: [dayjs(payload.startDate).format(), dayjs(payload.endDate).format()],
            }
        } else if (typeof payload.startDate !== 'undefined' && typeof payload.endDate === 'undefined') {
            filter.clockIn = {
                [Op.between]: [dayjs(payload.startDate).format(), dayjs().format()],
            }
        } else if (typeof payload.startDate === 'undefined' && typeof payload.endDate !== 'undefined') {
            filter.clockIn = {
                [Op.between]: [dayjs().format(), dayjs(payload.endDate).format()],
            }
        }

        if (typeof payload.amountFrom !== 'undefined' && typeof payload.amountTo !== 'undefined') {
            filter.amount = {
                [Op.between]: [ parseInt(payload.amountFrom) || 0, parseInt(payload.amountTo) || 0 ],
            }
        } else if (typeof payload.amountFrom !== 'undefined' && typeof payload.amountTo === 'undefined') {
            filter.amount = {
                [Op.between]: [ parseInt(payload.amountFrom) || 0, 0 ],
            }
        } else if (typeof payload.amountFrom === 'undefined' && typeof payload.amountTo !== 'undefined') {
            filter.amount = {
                [Op.between]: [ 0, parseInt(payload.amountTo) || 0 ],
            }
        }

        return await Parking
        .findAll({
            where: filter,
            include: condition,
        })
        .then(data => data)
        .catch(err => err.message);
    }
}