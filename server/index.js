const express = require("express");
const app = express();
const GenericRouter = require("./routes/genericCRUD");
const GenericController = require("./controllers/genericCRUD");
const userService = require("./services/user");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(function (req, res, next) {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!req.is("application/json")) {
      return res.sendStatus(400);
    }
  }
  next();
});

app.use(express.json());

app.use(require("./routes/security")(userService));

app.use("/users", require("./routes/user"));
app.use("/users2", new GenericRouter(new GenericController(userService)));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  res.json(req.body);
});

app.use(errorHandler);

app.listen(3000, () => console.log("Server started on port 3000"));
