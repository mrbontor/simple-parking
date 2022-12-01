'use strict';

module.exports = (sequelize, DataTypes) => {
    const TransportType = sequelize.define('TransportType', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        tableName: 'transportType',
        timestamps: false,
        underscored: true
    });

    TransportType.associate = function associate(models) {
        TransportType.hasMany(models.Parking, {
            foreignKey: 'typeId',
            allowNull: false
        });
    };

    return TransportType;
}
