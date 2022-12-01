const Express = require('express');
const App = Express();

// Initialize config file
require('dotenv').config();

process.env.TZ = 'Asia/Jakarta';

const DbCon = require('../app/models/parkir-db');
DbCon.sequelize.sync()
.then(() => {
    console.info('[MYSQL] database parkir-db connected ');
})
.catch(err => {
    console.error('[MYSQL] connection database parkir-db failed...' + err.message);
    console.error('[MYSQL] connection database parkir-db failed...' + err.stack);
});


const Router = require('./router');
App.use('/api', Router);

module.exports = App;
