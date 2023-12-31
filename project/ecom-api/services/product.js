const { Product } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function ProductService() {
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
            return Product.findAll(dbOptions);
        },
        findOne: async function (filters) {

            return Product.findOne({ where: filters });
        },
        create: async function (data) {
            delete data['currentUserId'];
            try {
                return await Product.create(data);
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
                const Product = await this.create(newData);
                return [[Product, nbDeleted === 0]];
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
                const [nbUpdated, products] = await Product.update(newData, {
                    where: filters,
                    returning: true,
                    individualHooks: true,
                });

                return products;
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
            return Product.destroy({ where: filters });
        },
    };
};
