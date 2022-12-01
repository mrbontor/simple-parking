const { Router } = require('express');
const App = new Router();

const TransportTypeRoute = require('./type');
const ParkingRoute = require('./parking');

App.use('/types', TransportTypeRoute);
App.use('/parking', ParkingRoute);

module.exports = App;
