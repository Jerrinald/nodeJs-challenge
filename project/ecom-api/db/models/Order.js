module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  
  class Order extends Model {}

  Order.init(
    {
      idClient: {
        type: DataTypes.INTEGER,
        allowNull: true, // Set to false if this field should not be nullable
      },

      numeroCommande: {
        type: DataTypes.STRING,
        allowNull: true, // Set to false if this field should not be nullable
      },
      numeroProduit: {
        type: DataTypes.STRING,
        allowNull: true, // Set to false if this field should not be nullable
      },
      prixProduit: {
        type: DataTypes.FLOAT,
        allowNull: true, // Set to false if this field should not be nullable
      },
      quantiteProduit: {
        type: DataTypes.INTEGER,
        allowNull: false, // Set to false if this field should not be nullable
      },
      statut: {
        type: DataTypes.STRING,
        allowNull: false, // Set to false if this field should not be nullable
      },
    },
    { sequelize: connection, tableName: "orders" }
  );

  // If you want to add any hooks or custom methods specific to the Order model, you can do it here.

  return Order;
};
