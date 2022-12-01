const { TransportTypeService } = require('../../services');
const ResponseHelper = require('../../helpers/response');

module.exports = {
    createType: async (req, res) => {
        try {
            const data = await TransportTypeService.createTransportType(req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[CREATE][TYPE][TRANSPORT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getTypes: async (req, res) => {
        try {
            const data = await TransportTypeService.getTransportTypes();
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[GET][TYPE][TRANSPORT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getType: async (req, res) => {
        try {
            const data = await TransportTypeService.getTransportType(req.params.id);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[GET][TYPE][TRANSPORT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateType: async (req, res) => {
        try {
            const data = await TransportTypeService.updateTransportType(req.params.id, req.body);
            ResponseHelper.noContent(res);
        } catch (err) {
            console.error(`[UPDATE][TYPE][TRANSPORT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    removeType: async (req, res) => {
        try {
            await TransportTypeService.remove(req.params.id);
            ResponseHelper.noContent(res);
        } catch (err) {
            console.error(`[DELETE][TYPE][TRANSPORT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

};
