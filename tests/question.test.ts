const request = require('supertest');
import { expect } from 'chai';
import Server from '../src/server';

const app = new Server();

describe('GET /questions', function() {
  it('responds with json', function(done) {
    request(app.app)
      .get('/questions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { questions } = response.body;
        expect(questions.length).to.eq(3)
        done();
      })
      .catch(err => done(err))
  });
});

after(async (done) => {
  done()
})
