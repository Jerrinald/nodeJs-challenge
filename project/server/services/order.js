const { Order, Product } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function OrderService() {
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
            return Order.findAll(dbOptions);
        },
        findOne: async function (filters) {

            return Order.findOne({ where: filters });
        },
        create: async function (data) {
            try {
                // Get the price of the product from the Product table
                const product = await Product.findOne({ where: { id: data.productId } });

                // Calculate the total amount based on the product price and quantity
                const amount = product.price * data.quantity;
                data.amount = amount;

                data.userId = data.currentUserId;
                delete data['currentUserId'];
                
                return await Order.create(data);
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
                const Order = await this.create(newData);
                return [[Order, nbDeleted === 0]];
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
                const [nbUpdated, orders] = await Order.update(newData, {
                    where: filters,
                    returning: true,
                    individualHooks: true,
                });

                return orders;
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
            return Order.destroy({ where: filters });
        },
    };
};
