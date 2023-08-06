module.exports = (connection) => {

    const { DataTypes, Model } = require("sequelize");

    class Operation extends Model { }

    Operation.init(
        {
            MarchandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            NatureOp: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            TransactionId: { // Updated field name to TransactionId
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Montant: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        { sequelize: connection, tableName: "operations" },
    );

    // Define associations here if needed

    return Operation;
};
