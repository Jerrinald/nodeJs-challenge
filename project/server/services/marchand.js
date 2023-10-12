const { Marchand } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API);

module.exports = function MarchandService() {
    return {
        findAll: async function (filters, options) {
            let dbOptions = {
                where: filters,
            };
            if (options.order) {
                dbOptions.order = Object.entries(options.order);
            }
            if (options.limit) {
                dbOptions.limit = options.limit;
                dbOptions.offset = options.offset;
            }
            return Marchand.findAll(dbOptions);
        },

        findOne: async function (filters) {
            return Marchand.findOne({ where: filters });
        },

        create: async function (data) {
            try {
                console.log(process.env.SENDGRID_API)
                //return await Marchand.create(data);
                // Créer un nouvel marchand dans la base de données
                const newUser = await Marchand.create(data);

                // Générer un jeton d'activation unique pour l'utilisateur (vous pouvez utiliser une bibliothèque comme "uuid" pour cela)
                /*const activationToken = uuidv4();

               // Sauvegarder le jeton d'activation dans la base de données associée à l'utilisateur
               newUser.activationToken = activationToken;
               await newUser.save();*/

               // Envoi de l'e-mail de validation
               const msg = {
                   to: newUser.email, // Adresse e-mail de l'utilisateur enregistré
                   from: 'ndiaby6@myges.fr', // Remplacez par votre adresse e-mail
                   subject: 'Confirmation d\'inscription', // Sujet de l'e-mail
                   html: `<p>Merci de vous être inscrit !</p>
                   `
               };

               await sgMail.send(msg); 

                return newUser;

            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        replace: async function (filters, newData) {
            try {
                if (!filters || Object.keys(filters).length === 0) {
                    throw new Error("Invalid filters.");
                }
                const nbDeleted = await this.delete(filters);
                const marchand = await this.create(newData);
                return [[marchand, nbDeleted === 0]];
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        update: async function (filters, newData) {
            try {
                if (!filters || Object.keys(filters).length === 0) {
                    throw new Error("Invalid filters.");
                }
                const [nbUpdated, marchands] = await Marchand.update(newData, {
                    where: filters,
                    returning: true,
                    individualHooks: true,
                });

                return marchands;
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        delete: async function (filters) {
            if (!filters || Object.keys(filters).length === 0) {
                throw new Error("Invalid filters.");
            }
            return Marchand.destroy({ where: filters });
        },

        findByToken: async function (token) {
            return Marchand.findOne({ where: { token } });
        },

        login: async (email, password, clientID, clientSecret) => {

            //IF CLIENT ID AND CLIENT SECRET ARE NOT NULL
            if (clientID && clientSecret) {
                const marchand = await Marchand.findOne({ where: { clientID } });
                if (!marchand) {
                    throw new ValidationError({
                        clientID: "Invalid credentials",
                    });
                }

                const clientSecretValid = await marchand.clientSecret;
                if (clientSecretValid != clientSecret) {
                    throw new ValidationError({
                        clientID: "Invalid credentials",
                    });
                }
                return marchand;

            }


            const marchand = await Marchand.findOne({ where: { email } });
            if (!marchand) {
                throw new ValidationError({
                    email: "Invalid credentials",
                });
            }
            const isPasswordValid = await marchand.isPasswordValid(password);
            if (!isPasswordValid) {
                throw new ValidationError({
                    email: "Invalid credentials",
                });
            }

            return marchand;
        },
    };
};
