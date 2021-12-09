const request = require('supertest');
import { expect } from 'chai';
import Server from '../src/server';
import client from '../src/dbconfig/dbconnection';

const app = new Server();

describe('GET /user_responses', async function() {
  let userResponses = await client.query('select * from responses where email = "abc@gmail.com');

  it('responds with json', function(done) {

    request(app.app)
      .get('/user_responses')
      .set('Accept', 'application/json')
      .send({
        email: 'abc@gmail.com'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { userResponse } = response.body;
        expect(userResponse.length).to.eq(userResponses.rows.length);
        done();
      })
      .catch(err => done(err))
  });
});

after(async (done) => {
  done()
})
