const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	productName: { type: String, required: true },
	price: { type: Number, required: true },
	galenical: { type: String, required: true },
	quantity: { type: Number, required: true },
	expirationDate: { type: Date, required: true }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product