const { Marchand } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function UserMarchand() {
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
                return await Marchand.create(data);
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
    };
};
