const { ParkingService } = require('../../services');
const ResponseHelper = require('../../helpers/response');

module.exports = {
    createParking: async (req, res) => {
        try {
            const data = await ParkingService.createParking(req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[CREATE][PARKING] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getParkings: async (req, res) => {
        try {
            const data = await ParkingService.getParkings(req.query);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[GET][PARKING] >>>>> ${JSON.stringify(err.stack)}`);
            ResponseHelper.error(res, err);
        }
    },

    getParking: async (req, res) => {
        try {
            const data = await ParkingService.getParking(req.params.id);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[GET][PARKING] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateParking: async (req, res) => {
        try {
            const data = await ParkingService.patchParking(req.params.id, req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[UPDATE][PARKING] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    removeParking: async (req, res) => {
        try {
            await ParkingService.remove(req.params.id);
            ResponseHelper.noContent(res);
        } catch (err) {
            console.error(`[DELETE][PARKING] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

};
