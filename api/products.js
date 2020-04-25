const url = require("url");
const MongoClient = require("mongodb");

// Create Cached connection variabel
let cachedDb = null;

async function connectToDatebase(url) {
  if (cachedDb) {
    return cachedDb;
  }
  // If no connection, create new
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
}

module.exports = async (req, res) => {
  // Get a db connection, cached or otherwise,
  // Use the connection string env as the arg

  const db = await connectToDatebase(process.env.MONGODB_URI);

  // Select "products" collection from the db
  const collection = await db.collection("products");

  // Search product colection from the db
  const products = await collection.find({}).toArray();

  // Return the response as JSON
  res.status(200).json({ products });
};
