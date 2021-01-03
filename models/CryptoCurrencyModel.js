const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CryptoCurrencySchema = new Schema({
	_creator: { type: Schema.Types.ObjectId, ref: 'Users' },
	symbol: { type: String, required: true },
	current_price: { type: Number, required: true },
	name: { type: String, required: true, indexes: { unique: true } },
	image: { type: String, required: false },
	last_updated: { type: Date, required: true },
});

module.exports = mongoose.model("CryptoCurrencies", CryptoCurrencySchema);
