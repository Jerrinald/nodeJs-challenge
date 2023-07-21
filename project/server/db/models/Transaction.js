const { DataTypes, Model, Transaction } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (connection) => {

    class Transaction extends Model {
        isPasswordValid(password) {
            return bcrypt.compare(password, this.password);
        }
    }

    Transaction.init(
        {
            IdClient: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            IdMarchand: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [1, 32],
                },
            },
            IdCmd: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            Montant: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            Devise: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            Statut: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            Date: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            Heure: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            Pays: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },

            IPClient: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },

        },
        { sequelize: connection, tableName: "transactions" },
    );

    return Transaction;
};

