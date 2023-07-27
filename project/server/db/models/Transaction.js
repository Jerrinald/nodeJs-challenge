module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
  
    class Transaction extends Model {}

    Transaction.init(
        {

            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: "1",
            },

            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "new",
            },

        },
        { sequelize: connection, tableName: "transactions" },
    );

    return Transaction;
};