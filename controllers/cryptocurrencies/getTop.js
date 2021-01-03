const UserSchema = require('../../models/UserModel');
const CoinGecko = require('../../utils/coingecko/coingecko');

const getTop = async (req, res) => {
	const userId = req.userId;
	const order =
		req.query.order === 'asc' ? 'current_price' : req.query.order === 'desc' ? '-current_price' : '-current_price';
	const coinGeckoAPI = new CoinGecko();
	const n = req.query.n || 25;
	if (n > 25) {
		return res.status(400).json({ message: 'n cant be greater than 25' });
	}
	try {
		const foundUser = await UserSchema.findById(userId).populate({ path: 'currencies', options: { sort: order, limit: n } });
		if (foundUser) {
			const cryptocurrencies = foundUser.currencies;
			const ids = cryptocurrencies.map((currency) => currency.id).join(',');
			const currencies = 'usd,ars,eur';
			const options = { ids: ids, vs_currencies: currencies };
			const prices = await coinGeckoAPI.getPriceByCurrencies(options);
			const returnedTop = cryptocurrencies.map((cryptocurrency) => {
				return {
					symbol: cryptocurrency.symbol,
					prices: prices[cryptocurrency.id],
					name: cryptocurrency.name,
					image: cryptocurrency.image,
					last_updated: cryptocurrency.last_updated,
				};
			});
			return res.status(200).json({ top: returnedTop });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'something went wrong while fetching currency list, please try later' });
	}
};

module.exports = getTop;
