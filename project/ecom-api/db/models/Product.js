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
        image: {
          type: DataTypes.STRING, // Assuming you will store the image URL as a string
          allowNull: true, // Allow null as the image might not be uploaded initially
        },

        numeroProduit: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Other Product-related properties go here
  
      },
      { sequelize: connection, tableName: "products" }
    );
  
    return Product;
  };