const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (connection) => {
    class Merchant extends Model {
        istokenValid(token) {
            return bcrypt.compare(token, this.token);
        }
    }

    Merchant.init(
        {
            companyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            KBIS: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [1, 32],
                },
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                    // Add more password validation rules if needed
                    // is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                },
            },
            numero: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },

            url_confirmation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url_annulation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            devise: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize: connection, tableName: "marchands" },
    );

    function updateToken(merchant) {
        return bcrypt.genSalt(10).then((salt) =>
            bcrypt.hash(merchant.token, salt).then((hash) => {
                merchant.token = hash;
            }),
        );
    }

    Merchant.addHook("beforeCreate", (merchant) => {
        return updateToken(merchant);
    });

    Merchant.addHook("beforeUpdate", async (merchant, options) => {
        if (options.fields.includes("password")) {
            return updateToken(merchant);
        }
    });

    return Merchant;
};
