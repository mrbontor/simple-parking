const express = require('express');
const App = express();

const { ParkingController } = require('../../../controllers');

App.post('/', ParkingController.createParking);
App.get('/', ParkingController.getParkings);
App.get('/:id', ParkingController.getParking)
    .put('/:id', ParkingController.updateParking)
    .delete('/:id', ParkingController.removeParking);

module.exports = App;
