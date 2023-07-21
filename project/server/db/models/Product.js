module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
  
    class Product extends Model {}
  
    Product.init(
      {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 32],
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        marchandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "marchands",
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },

        // Other Product-related properties go here
  
      },
      { sequelize: connection, tableName: "products" }
    );
  
    return Product;
  };