const express = require("express");
const app = express();
const UserRouter = require("./routes/user");
const ProductRouter = require("./routes/product");
const OrderRouter = require("./routes/order");
const SecurityRouter = require("./routes/security");
const ValidationError = require("./errors/ValidationError");
const cors = require("cors");
const checkFormat = require("./middlewares/check-format");
const errorHandler = require("./middlewares/error-handler");
const checkAuth = require("./middlewares/check-auth");
const checkAuthProduct = require("./middlewares/check-auth-product");
const checkCurrentUser = require("./middlewares/check-current-user");
const retrieveImage = require("./middlewares/retrieveImage.js");


app.use(cors());

app.use(checkFormat);

app.use(express.json());
app.use("/", SecurityRouter);
// app.use(checkAuth); -> protect every routes below
app.use("/users", checkAuth, UserRouter); // protect only this route

app.use("/products", checkAuthProduct, checkCurrentUser, retrieveImage, ProductRouter);

app.use("/orders", checkAuth, checkCurrentUser,OrderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.json(req.body);
});

app.use('/Images', express.static('./Images'))

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
