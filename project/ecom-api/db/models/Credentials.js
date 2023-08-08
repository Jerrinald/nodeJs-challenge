// credentials.js
module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");

    class Credentials extends Model { }

    Credentials.init(
        {
            clientId: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            clientSecret: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        { sequelize: connection, tableName: "credentials" }
    );
    return Credentials;

}