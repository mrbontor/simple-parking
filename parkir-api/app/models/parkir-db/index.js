'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.ENV || 'development';
const config = require('../../../configs/config.json')[env]['parkir-db'];

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], Object.assign({}, config, {
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        }
    }));
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, Object.assign({}, config, {
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        }
    }));
}

db.Parking = require(path.join(__dirname, '/parking'))(sequelize, Sequelize);
db.TransportType = require(path.join(__dirname, '/type'))(sequelize, Sequelize);

db.sequelize = sequelize;

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
