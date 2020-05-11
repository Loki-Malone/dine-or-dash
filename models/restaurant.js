module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define("Restaurant", {
        id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Restaurant;
};