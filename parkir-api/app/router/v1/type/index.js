const express = require('express');
const App = express();

const { TransportTypeController } = require('../../../controllers');

App.post('/', TransportTypeController.createType);
App.get('/', TransportTypeController.getTypes);
App.get('/:id', TransportTypeController.getType)
    .put('/:id', TransportTypeController.updateType)
    .delete('/:id', TransportTypeController.removeType);

module.exports = App;
