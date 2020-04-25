const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Pass express() to app
const app = express();

// Declare port
const port = process.env.PORT || 1964;

app.use(cors());
app.use(express.json());

// Pull the mongoose connection address
const uri = process.env.MONGODB_URI;

// Establish connection to mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(Date() + ` Database connection established!`);
});

// Display welcome page!

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Building Routes

// Routes for products
const productsRouter = require("./routes/products");

// Routes for users
const usersRouter = require("./routes/users");

// Build address routes
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(Date() + ` Server running on port: ${port}`);
});
