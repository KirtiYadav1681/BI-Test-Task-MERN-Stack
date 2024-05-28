const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Authentication', () => {
  describe('/POST login', () => {
    it('it should LOGIN a user', (done) => {
      const user = {
        email: 'test@example.com',
        password: '123456'
      };
      chai.request(server)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('token');
            done();
          });
    });

    it('it should NOT LOGIN a user with incorrect credentials', (done) => {
      const user = {
        email: 'wrong@example.com',
        password: 'wrongpassword'
      };
      chai.request(server)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
            done();
          });
    });
  });
});
