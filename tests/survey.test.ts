const request = require('supertest');
import { expect } from 'chai';
import Server from '../src/server';

const app = new Server();

describe('Post /surveys', function() {
  it('will return 422 json response with error message', function(done) {
    request(app.app)
      .post('/surveys')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then(response => {
        const { message } = response.body;
        expect(message).to.eq('Please submit question response according to config')
        done();
      })
      .catch(err => done(err))
  });

  it('will return 422 json response with invalid answer to text type question', function(done) {
    request(app.app)
      .post('/surveys')
      .set('Accept', 'application/json')
      .send({
        answer: "first answer",
        email: 'abc@gmail.com',
        questionId: 2
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then(response => {
        const { message } = response.body;
        expect(message).to.eq('Please submit question response according to config')
        done();
      })
      .catch(err => done(err))
  });

  it('will return 200 json response with text type question', function(done) {
    request(app.app)
      .post('/surveys')
      .set('Accept', 'application/json')
      .send({
        answer: "first answer",
        email: 'abc@gmail.com',
        questionId: 1
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { message } = response.body;
        expect(message).to.eq('Survey submitted successfully')
        done();
      })
      .catch(err => done(err))
  });


  it('will return 200 json response with boolean type question', function(done) {
    request(app.app)
      .post('/surveys')
      .set('Accept', 'application/json')
      .send({
        answer: false,
        email: 'abc@gmail.com',
        questionId: 2
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { message } = response.body;
        expect(message).to.eq('Survey submitted successfully')
        done();
      })
      .catch(err => done(err))
  });

  it('will return 200 json response with radio type question', function(done) {
    request(app.app)
      .post('/surveys')
      .set('Accept', 'application/json')
      .send({
        answer: 'indifferent',
        email: 'abc@gmail.com',
        questionId: 3
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { message } = response.body;
        expect(message).to.eq('Survey submitted successfully')
        done();
      })
      .catch(err => done(err))
  });
});

after(async (done) => {
  done()
})
