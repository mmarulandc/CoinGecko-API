const UserSchema = require('../../models/UserModel');
const CoinGecko = require('../../utils/coingecko/coingecko');

const gettAllCryptoCurrencies = async (req, res) => {
	let page = req.query.page || 1;
	let per_page = req.query.per_page || 100;
	per_page = per_page > 250 ? 250 : per_page;

	const userId = req.userId;
	try {
		const favoriteCurrency = await UserSchema.findById(userId).select('favoriteCurrency');
		const options = {
			page,
			per_page,
			vs_currency: favoriteCurrency.favoriteCurrency,
		};
		const coinGeckoAPI = new CoinGecko();
		const markets = await coinGeckoAPI.getList(options);
		return res.status(200).json({
			markets: markets.map((market) => {
				return {
					symbol: market.symbol,
					current_price: market.current_price,
					name: market.name,
					image: market.image,
					last_updated: market.last_updated,
				};
			}),
		});
	} catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'something went wrong fetching currency list, try again'
    })
  }
};

module.exports = gettAllCryptoCurrencies;
