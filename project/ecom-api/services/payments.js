const { Payment } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function PaymentService() {
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
            return Payment.findAll(dbOptions);
        },
        findOne: async function (filters) {
            return Payment.findOne({ where: filters });
        },
        create: async function (data) {
            try {
                return await Payment.create(data);
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
                const payment = await this.create(newData);
                return [[payment, nbDeleted === 0]];
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        update: async (filters, newData) => {
            try {
                // Ajoutez ici des validations spécifiques pour les données de paiement si nécessaire

                const [nbUpdated, payments] = await Payment.update(newData, {
                    where: filters,
                    returning: true,
                    individualHooks: true,
                });

                return payments;
            } catch (e) {
                if (e instanceof Sequelize.ValidationError) {
                    throw ValidationError.fromSequelizeValidationError(e);
                }
                throw e;
            }
        },
        delete: async (filters) => {
            return Payment.destroy({ where: filters });
        },
    };
};
