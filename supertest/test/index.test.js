const request = require('supertest');
const app = require('../server');

describe('/api/users', () => {
  it('should return correct users', () => {
    return request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(['John', 'Betty', 'Hal']);
      });
  });
});