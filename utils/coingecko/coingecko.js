const fetch = require('isomorphic-unfetch');
const querystring = require('querystring');

class CoinGecko {
	constructor() {
		this.baseUrl = 'https://api.coingecko.com/api/v3';
	}

	request(endpoint = '', options = {}) {
		const url = this.baseUrl + endpoint;

		const headers = {
			'Content-Type': 'application/json',
		};

		const config = {
			...options,
			...headers,
		};

		return fetch(url, config).then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw Error(response);
		});
	}

	getList(options) {
		const qs = options ? '?' + querystring.stringify(options) : '';
		const url = '/coins/markets' + qs;
		const config = {
			method: 'GET',
		};
		return this.request(url, config);
	}

	async getCoinByName(name) {
		const url = '/coins/list';
		const config = {
			method: 'GET',
		};
		const coinList = await this.request(url, config);
		const coin = coinList.filter((coin) => coin.name === name);
		return coin[0];
	}

	getCoinById(id) {
		const url = `/coins/${id}`;
		const config = {
			method: 'GET',
		};
		return this.request(url, config);
	}

	getPriceByCurrencies(options) {
		const qs = options ? '?' + querystring.stringify(options) : '';
		const url = '/simple/price' + qs;
		const config = {
			method: 'GET',
    };
    const result = this.request(url, config);
    return result;
	}
}

module.exports = CoinGecko;
