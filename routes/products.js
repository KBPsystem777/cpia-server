const router = require("express").Router();

let Product = require("../models/productModel");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.json(400).json(`Error: ` + err));
});

// Fields needed for Product
router.route("/add").post((req, res) => {
  const productName = req.body.productName;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = Number(req.body.quantity);
  const expirationDate = Date.parse(req.body.expirationDate);

  const newProduct = new Product({
    productName,
    price,
    category,
    quantity,
    expirationDate,
  });
  // Save new product
  newProduct
    .save()
    .then(() => res.json(`Product Added!`))
    .catch((err) => res.status(400).json(`Error: ` + err));
});

// Get products records by ID#
router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete a product record
router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Product deleted!`))
    .catch((err) => res.json(400).json(`Error: ` + err));
});

// Update an existing product
router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.productName = req.body.productName;
      product.price = req.body.price;
      product.category = req.body.category;
      product.quantity = Number(req.body.quantity);
      product.expirationDate = Date.parse(req.body.expirationDate);

      product.save().then(() => res.json(`Product updated!`));
    })
    .catch((err) => res.status(400).json(`Error: ` + err));
});

module.exports = router;
