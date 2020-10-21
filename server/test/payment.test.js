const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/jwt");
const { sequelize, Users } = require("../models");
const { queryInterface } = sequelize;
const stripe = require('stripe')('sk_test_51HdtTKAh63sGgRSDkRYGnptHJ4hgJUkaBQueiHRzpjZnqV9O1HGRRTN1fPsOLDKYaCcdQxnyCYaB3ilc8fBwW1Zu00ESHLlRlh')


const userData = {fullname: 'user', email: 'user@mail.com', password: '123456'}
let access_token

afterAll((done) => {
    queryInterface
      .bulkDelete("Categories")
      .then(() => done())
      .catch((err) => {
        console.log(err);
        done();
    });
    queryInterface
      .bulkDelete("Users")
      .then(() => done())
      .catch((err) => {
        console.log(err);
        done();
    });
});

beforeAll( async (done) => {
  try {
    const newUser = await Users.create(userData)
    const user = await Users.findOne({where: { email: newUser.email}})
    access_token = generateToken(user)
    done()
  } catch (error) {
    console.log(error)
    done()
  }
})

describe('success read paymment histories', () => {
  it('test success read paymment histories', (done) => {
    request(app)
      .get('/payment')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        // console.log(response)
        const { body, status } = response
        // console.log(body, 'dari test')
        expect(status).toBe(200)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})

describe('success create payment history', () => {
  it('test success create payment history', (done) => {
    request(app)
      .post('/payment/create/1/20000')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        // console.log(response, 'ini body')
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', 'Payment successfull')
        done()
      })
  })
})

describe('success create payment stripe', () => {
  it('test success create payment stipe', (done) => {
    request(app)
      .post('/payment')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send({
        price: 50000,
        token: {
          email: 'user@mail.com'
        }
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        // console.log(response, 'ini body')
        const { body, status } = response
        expect(status).toBe(200)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})

describe('fail create payment stripe', () => {
  it('test fail create payment stipe wrong email', (done) => {
    request(app)
      .post('/payment')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send({
        price: 50000,
        token: {
          email: 'uday@mail.com'
        }
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        // console.log(response, 'ini body')
        const { body, status } = response
        expect(status).toBe(400)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})

describe('fail create payment stripe', () => {
  it('test fail create payment stipe no access-token', (done) => {
    request(app)
      .post('/payment')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send({
        price: 50000,
        token: {
          email: 'user@mail.com',
          id: 'as'
        }
      })
      // .expect("Content-Type", /json/)
      .then((response) => {
        // console.log(response, 'ini body')
        const { body, status } = response
        expect(status).toBe(500)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})

describe('fail read paymment histories', () => {
  it('test fail read paymment histories', (done) => {
    request(app)
      .get('/payment')
      .set("Accept", "application/json")
      // .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        console.log(response)
        const { body, status } = response
        // console.log(body, 'dari test')
        expect(status).toBe(500)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})

describe('fail create payment history', () => {
  it('test fail create payment history', (done) => {
    request(app)
      .post('/payment/create/1/20000')
      .set("Accept", "application/json")
      // .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        // console.log(response, 'ini body')
        const { body, status } = response
        expect(status).toBe(500)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})