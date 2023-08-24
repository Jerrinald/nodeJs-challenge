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
            transactionIdArr: { // Updated field name to TransactionId
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
            Montant: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
            },
            orderIdArr: { // Updated field name to TransactionId
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
            creditCardNumber: {
                type: DataTypes.STRING,
                allowNull: true
            },
            creditCardExpdate: {
                type: DataTypes.STRING,
                allowNull: true
            },
            creditCardCvc: {
                type: DataTypes.STRING,
                allowNull: true
            },
            creditCardName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            clientName: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
        { sequelize: connection, tableName: "operations" },
    );

    // Define associations here if needed

    return Operation;
};
