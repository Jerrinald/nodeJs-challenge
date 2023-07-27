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
            validate: {
                isEmail: true,
            },
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
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  len: [1, 32],
                  //is: /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])/,
                },
            },
            role: {
                type: DataTypes.ENUM("marchand"), // Define the 'role' field as an ENUM type with allowed values 'client' and 'admin'
                defaultValue: "marchand", // Set a default value for the 'role' field (optional)
            },
        },
        { sequelize: connection, tableName: "marchands" },
    );

    function updatePassword(marchand) {
        return bcrypt.genSalt(10).then((salt) =>
          bcrypt.hash(marchand.password, salt).then((hash) => {
            marchand.password = hash;
          })
        );
      }

    function updateToken(Marchand) {
        return bcrypt.genSalt(10).then((salt) =>
            bcrypt.hash(Marchand.token, salt).then((hash) => {
                Marchand.token = hash;
            }),
        );
    }

    Marchand.addHook("beforeCreate", (marchand) => {
        return updatePassword(marchand);
    });
    
    Marchand.addHook("beforeUpdate", async (marchand, options) => {
        if (options.fields.includes("password")) {
            return updatePassword(marchand);
        }
    });

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
