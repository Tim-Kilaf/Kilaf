const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/jwt");
const { sequelize, Users } = require("../models");
const { queryInterface } = sequelize;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const userData = {email: 'user@mail.com', password: '123456'}
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

beforeAll((done) => {
    Users.create({
      fullname: 'user',
      email: 'user@mail.com',
      password: '123456'
    })
    .then((data) => {
    //   console.log(data)
      return Users.findOne({ where: { email: userData.email } })
    })
    .then((user) => {
      access_token = generateToken(user);
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
})

// .get('/', authenticate, PaymentController.read)
// .post('/', authenticate, PaymentController.stripe)
// .post('/create/:TrxId/:amount', authenticate, PaymentController.create)

describe('success read paymment histories', () => {
  it('test success read paymment histories', (done) => {
    request(app)
      .get('/payment')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        console.log(response)
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
        console.log(response, 'ini body')
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', 'Payment successfull')
        done()
      })
  })
})

describe.only('success create payment stripe', () => {
  it('test success create payment stipe', (done) => {
    request(app)
      .post('/payment')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send({
        price: 50000,
        token: {
          id: createToken(),
          email: 'user@mail.com'
        }
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        console.log(response, 'ini body')
        const { body, status } = response
        expect(status).toBe(200)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})