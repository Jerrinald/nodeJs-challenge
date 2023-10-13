const { Operation } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function OperationService() {
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
            return Operation.findAll(dbOptions);
        },
        findOne: async function (filters) {
            return Operation.findOne({ where: filters });
        },
        findByMerchantId: async function (marchandId) {
            return Operation.findAll({ where: { marchandId } });
        },
        create: async function (data) {
            try {
                return await Operation.create(data);
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        replace: async function (filters, newData) {
            try {
                const nbDeleted = await this.delete(filters);
                const operation = await this.create(newData);
                return [[operation, nbDeleted === 0]];
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        update: async (filters, newData) => {
            try {
                // Add specific payment data validation here if necessary

                const [nbUpdated, operations] = await Operation.update(newData, {
                    where: filters,
                    returning: true,
                    individualHooks: true,
                });

                return operations;
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        delete: async (filters) => {
            return Operation.destroy({ where: filters });
        },
    };
};
