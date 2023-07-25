module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
  
    class Order extends Model {}
  
    Order.init(
      {
        billing: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 32],
        },
        },
        delivery: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 32],
            },
          },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 32],
            },
          },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        // Add the status field with a default value of "new"
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "new",
        },
        // Other order-related properties go here
  
        // Foreign key referencing the User table
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
      },
      { sequelize: connection, tableName: "orders" }
    );
  
    return Order;
  };