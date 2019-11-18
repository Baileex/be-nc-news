process.env.NODE_ENV = 'test';
const chai = require('chai');
const {expect} = chai;
const chaiSorted = require('chai-sorted');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/data');

chai.use(chaiSorted);

describe("/api", () => {
  after(() => {
    return connection.destroy();
  })
  it('GET', () => {
    return request(app).get('/api').expect(200)
  });

})
