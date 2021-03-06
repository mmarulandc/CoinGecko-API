const UserSchema = require('../../models/UserModel');
const CryptoCurrencySchema = require('../../models/CryptoCurrencyModel');
const CoinGecko = require('../../utils/coingecko/coingecko');

const mongoose = require('mongoose');


const addCurrency = async (req, res) => {
	const { name } = req.body;
	const api = new CoinGecko();
	try {
		const coin = await api.getCoinByName(name);
		if (!coin) {
			return res.status(404).json({ message: 'This Cryptocurrency does not exist.' });
		}
		const userId = req.userId;
		const coinDetail = await api.getCoinById(coin.id);
    const foundUser = await UserSchema.findById(userId);
		if (foundUser) {
			const data = {
        name: coinDetail.name,
        id: coin.id,
				_creator: mongoose.Types.ObjectId(userId),
				symbol: coinDetail.symbol,
				current_price: coinDetail.market_data.current_price[foundUser.favoriteCurrency],
				image: coinDetail.image.large,
				last_updated: coinDetail.last_updated,
      };
			const currency = new CryptoCurrencySchema(data);
      const foundCurency = await CryptoCurrencySchema.find({ name: name, _creator:data._creator });
			if (foundCurency.length > 0) {
				return res
					.status(409)
					.json({ message: 'This currency is already added in your collection, try with another one.' });
			}
			foundUser.currencies.push(currency);
			await currency.save();
			await foundUser.save();
			return res.status(200).json({
				message: 'new Cryptocurrency was added',
			});
		} else {
			return res.status(404).json({
				message: 'unauthorized, user not found',
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'something went wrong while adding a new currency' });
	}
};

module.exports = addCurrency;
