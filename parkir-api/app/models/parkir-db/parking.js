module.exports = (sequelize, DataTypes) => {
    const Parking = sequelize.define('Parking', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        plate: { type: DataTypes.STRING },
        typeId: { type: DataTypes.INTEGER },
        clockIn: {
            type: DataTypes.DATE,
        },
        clockOut: {
            type: DataTypes.DATE,
        },
        amount: { type: DataTypes.INTEGER },
        description: { type: DataTypes.STRING },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'parking',
        timestamps: false,
        underscored: true,
    });
    Parking.associate = function associate(models) {
        Parking.hasOne(models.TransportType, {
            foreignKey: 'id',
            allowNull: false,
            as: 'type'
        });
    };

    return Parking;
}
