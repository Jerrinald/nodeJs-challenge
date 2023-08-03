module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");

    class Payment extends Model { }

    Payment.init(
        {
            MarchandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            OrderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            Num_CB: {
                type: DataTypes.STRING(16),
                allowNull: false,
            },
            Date_Exp: {
                type: DataTypes.STRING(7),
                allowNull: false,
            },
            CVC: {
                type: DataTypes.STRING(4),
                allowNull: false,
            },
            Titulaire_Carte: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Adresse_Facturation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Pays: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Montant: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            Devise: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Adresse_Email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Statut_Transaction: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "new",
            },
        },
        { sequelize: connection, tableName: "payments" },
    );

    return Payment;
};
