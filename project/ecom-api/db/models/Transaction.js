module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
  
    class Transaction extends Model {}

    Transaction.init(
        {
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "new",
            },
            country: {
                type: DataTypes.STRING,
                validate: {
                    len: [1, 32],
                },
            },
            ipClient: {
                type: DataTypes.STRING,
                validate: {
                    len: [1, 32],
                },
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: "orders",
                  key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
              },

        },
        { sequelize: connection, tableName: "transactions" },
    );

    return Transaction;
};