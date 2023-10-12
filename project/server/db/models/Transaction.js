module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");

    class Transaction extends Model { }

    Transaction.init(
        {

            orderId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: "1",
            },
            marchandId: {
                type: DataTypes.INTEGER,
                allowNull: true,

            },

            clientId: {
                type: DataTypes.INTEGER,
                allowNull: true,

            },
            clientName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },

            status: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "new",
            },

            link_payment: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "/payment",
            }

        },
        { sequelize: connection, tableName: "transactions" },
    );

    return Transaction;
};