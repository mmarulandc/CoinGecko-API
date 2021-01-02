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
}

module.exports = CoinGecko;
