module.exports = (connection) => {

    const { DataTypes, Model } = require("sequelize");
    const bcrypt = require("bcryptjs");

    class Marchand extends Model {
        istokenValid(token) {
            return bcrypt.compare(token, this.token);
        }

        isPasswordValid(password) {
            return bcrypt.compare(password, this.password);
        }
    }

    Marchand.init(
        {
            lastname: DataTypes.STRING,
            firstname: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
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
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            role: {
                type: DataTypes.ENUM("marchand"),
                defaultValue: "marchand",
            },
            adresse: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            clientID: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            clientSecret: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("en attente", "approuvé", "rejeté"),
                defaultValue: "en attente",
            },
        },
        { sequelize: connection, tableName: "marchands" },
    );

    async function updatePassword(marchand) {
        return bcrypt.genSalt(10).then((salt) =>
            bcrypt.hash(marchand.password, salt).then((hash) => {
                marchand.password = hash;
            })
        );
    }

    Marchand.addHook("beforeUpdate", async (marchand, options) => {
        if (options.fields.includes("password")) {
            return updatePassword(marchand);
        }
    });



    return Marchand;
};
