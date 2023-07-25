const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL_ECOM);
console.log(process.env.DATABASE_URL_ECOM);

connection
  .authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

module.exports = connection;
