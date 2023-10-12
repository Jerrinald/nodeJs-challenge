const ordersRouter = require("./custom_orders");

const ordersController = require("../controllers/orders");
const OrderService = require("../services/order");

module.exports = new ordersRouter(new ordersController(new OrderService()));

const { Router } = require("express");
