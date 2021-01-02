const chai = require('chai');
const chainHttp = require('chai-http');
const app = require('../index');
const expect = require('chai').expect;
chai.use(chainHttp);


describe('Authentication endpoints', () => {
	const userData = {
		name: 'Mateo',
		lastname: 'Marulanda',
		username: 'mmarulandc',
		password: 'thisIsAStrongPassword2',
		favoriteCurrency: 'usd',
	};
	describe('Testing Signup endpoint', () => {
		it('It should return http status 200', (done) => {
			chai.request(app)
				.post('/api/auth/signup')
				.send(userData)
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body.message).to.equals('The user has been registered sucsessfully');
					done();
				});
    }).timeout(15000);
    it('It should return error with an existing user', (done) => {
			chai.request(app)
				.post('/api/auth/signup')
				.send(userData)
				.end((err, res) => {
					expect(res).to.have.status(409);
					expect(res.body.message).to.equals('There is a user with the same username');
					done();
				});
		}).timeout(15000);
	});

	describe('Testing Login endpoint', () => {
		it('It should return a JWT', (done) => {
			chai.request(app)
				.post('/api/auth/login')
        .send({ username: userData.username, password: userData.password })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    
    it('It should return error message with an empty field', (done) => {
      chai.request(app)
      .post('/api/auth/login')
      .send({ username: "", password: userData.password })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('errors');
        done();
      });
    })
  });
  

});
