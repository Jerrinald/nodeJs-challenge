const { Credential } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function CredentialService() {
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
            return Credential.findAll(dbOptions);
        },

        findOne: async function (filters) {
            return Credential.findOne({ where: filters });
        },

        create: async function (data) {
            try {
                return await Credential.create(data);
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
                const Credential = await this.create(newData);
                return [[Credential, nbDeleted === 0]];
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
                const [nbUpdated, Credentials] = await Credential.update(newData, {
                    where: filters,
                    returning: true,
                    individualHooks: true,
                });
                return Credentials;
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
            return Credential.destroy({ where: filters });
        },
    };
};
