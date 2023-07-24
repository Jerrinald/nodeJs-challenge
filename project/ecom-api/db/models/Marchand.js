module.exports = (connection) => {

    const { DataTypes, Model } = require("sequelize");
    const bcrypt = require("bcryptjs");
    class Marchand extends Model {
        istokenValid(token) {
            return bcrypt.compare(token, this.token);
        }
    }

    Marchand.init(
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

    function updateToken(Marchand) {
        return bcrypt.genSalt(10).then((salt) =>
            bcrypt.hash(Marchand.token, salt).then((hash) => {
                Marchand.token = hash;
            }),
        );
    }

    Marchand.addHook("beforeCreate", (Marchand) => {
        return updateToken(Marchand);
    });

    Marchand.addHook("beforeUpdate", async (Marchand, options) => {
        if (options.fields.includes("password")) {
            return updateToken(Marchand);
        }
    });

    return Marchand;
};
