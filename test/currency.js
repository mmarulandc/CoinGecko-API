const chai = require('chai');
const chainHttp = require('chai-http');
const app = require('../index');
const expect = require('chai').expect;
chai.use(chainHttp);

describe('Currency endpoints', () => {
	let jwt;

	const testCurrency = {
		name: '0.5X Long Altcoin Index Token',
	};
	const testData = {
		username: 'mmarulandc',
		password: 'thisIsAStrongPassword2',
	};
	describe('Testing currency endpoints', () => {
		it('should return jwt token for using it into the next test', (done) => {
			chai.request(app)
				.post('/api/auth/login')
				.send(testData)
				.end((err, res) => {
					jwt = res.body.token;
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('token');
					done();
				});
		});
		it('should return all crypto currencies avaiable', (done) => {
			chai.request(app)
				.get('/api/currencies/getAllCurrencies')
				.set('Authorization', `Bearer ${jwt}`)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('markets');
					done();
				});
		});
		it('should return http status 422 unauthorized', (done) => {
			chai.request(app)
				.get('/api/currencies/getAllCurrencies')
				.end((err, res) => {
					expect(res).to.have.status(422);
					expect(res.body).to.have.property('message').to.have.equal('unauthorized');
					done();
				});
		});

		it('It should add a new cryptocurrency', (done) => {
			chai.request(app)
				.post('/api/currencies/addCurrency')
				.set('Authorization', `Bearer ${jwt}`)
				.send(testCurrency)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('message').to.have.equal('new Cryptocurrency was added');
					done();
				});
		});

		it('It should return error with name repeated', (done) => {
			chai.request(app)
				.post('/api/currencies/addCurrency')
				.set('Authorization', `Bearer ${jwt}`)
				.send(testCurrency)
				.end((err, res) => {
					expect(res).to.have.status(409);
					expect(res.body)
						.to.have.property('message')
						.to.have.equal('This currency is already added in your collection, try with another one.');
					done();
				});
		});
		it('It should error with name empty', (done) => {
			chai.request(app)
				.post('/api/currencies/addCurrency')
				.set('Authorization', `Bearer ${jwt}`)
				.send({ name: '' })
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('errors');
					done();
				});
		});
		it('It should list the cryptocurrencies top n', (done) => {
			chai.request(app)
				.get('/api/currencies/getTop')
				.set('Authorization', `Bearer ${jwt}`)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('top');
					done();
				});
		});
		it('It should return error due to n is greater than 25', (done) => {
			chai.request(app)
				.get('/api/currencies/getTop?n=26')
				.set('Authorization', `Bearer ${jwt}`)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('message').have.to.equal('n cant be greater than 25');
					done();
				});
		});
	});
});
