const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

require("dotenv").config();

// Pass express() to app
const app = express();

//Body Parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Declare port
const port = process.env.PORT || 1964;

app.use(cors());
app.use(express.json());

// Pull the mongoose connection address
const uri = process.env.MONGODB_URI;

// Establish connection to mongoose
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(new Date() + err));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(Date() + ` Database connection established!`);
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Display welcome page!
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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
