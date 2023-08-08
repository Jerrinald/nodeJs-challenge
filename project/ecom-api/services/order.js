const { Order, Product } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");
//const mongoose = require('mongoose');

/*const mongoURI = 'mongodb://root:password@mongo:27017/app'; // Remplacez par votre URI de connexion MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

// Gérer les événements de connexion et d'erreur
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// Définir le schéma pour la collection 'orders'
const orderSchema = new mongoose.Schema({
    idClient: { type: Number, allowNull: true },
    numeroCommande: { type: String, allowNull: true },
    numeroProduit: { type: String, allowNull: true },
    prixProduit: { type: Number, allowNull: true },
    quantiteProduit: { type: Number, required: true },
    statut: { type: String, required: true },
});

// Créer le modèle Mongoose basé sur le schéma
const OrderModel = mongoose.model('Order', orderSchema);*/

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
// Insertion dans PostgreSQL
                const postgresOrder = await Order.create(data);

                // Insertion dans MongoDB
                /*const order = new OrderModel(data);
                const mongoResult = await order.save();
                console.log('Order inserted into MongoDB:', mongoResult._id);*/

                return postgresOrder;
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
        searchOrders: async (req, res) => {
            try {
                const { searchQuery } = req.query;

                // Vérifier si la requête `searchQuery` est présente
                if (!searchQuery) {
                    return res.status(400).json({ message: 'Requête de recherche manquante.' });
                }

                // Effectuer la recherche dans la collection MongoDB en utilisant le modèle OrderModel
                const searchResult = await OrderModel.find({
                    $or: [
                        { idClient: { $regex: searchQuery, $options: 'i' } },
                        { numeroCommande: { $regex: searchQuery, $options: 'i' } },
                        { numeroProduit: { $regex: searchQuery, $options: 'i' } },
                        { statut: { $regex: searchQuery, $options: 'i' } },
                        // Ajoutez ici d'autres champs pour effectuer la recherche
                    ],
                });

                // Répondre avec les résultats de la recherche
                res.json(searchResult);
            } catch (error) {
                console.error('Erreur lors de la recherche des commandes:', error);
                res.status(500).json({ message: 'Erreur lors de la recherche des commandes.' });
            }
        },
    };
};
