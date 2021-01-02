const chai = require('chai');
const chainHttp = require('chai-http');
const app = require('../index');
const expect = require('chai').expect;
chai.use(chainHttp);

describe('Currency endpoints', () => {
	let jwt;
	const testData = {
		username: 'mmarulandc',
		password: 'thisIsAStrongPassword2',
	};

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
});
