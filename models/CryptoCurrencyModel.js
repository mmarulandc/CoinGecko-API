const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CryptoCurrencySchema = new Schema({
	symbol: { type: String, required: true },
	price: { type: String, required: true },
	name: { type: String, required: true, indexes: { unique: true } },
	image: { data: Buffer, contentType: String },
	last_updated: { type: Date, required: true },
});

module.exports = mongoose.model("CryptoCurrencies", CryptoCurrencySchema);
