// credentials.js
module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");

    class Credential extends Model { }

    Credential.init(
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
        { sequelize: connection, tableName: "credential" }
    );
    return Credential;

}