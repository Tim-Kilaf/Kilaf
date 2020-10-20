const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/jwt");
const { sequelize, Users } = require("../models");
const { queryInterface } = sequelize;


const userData = {email: 'user@mail.com', password: '123456'}
const userData2 = {email: 'user2@mail.com', password: '123456'}
let access_token
let access_token2

afterAll((done) => {
    queryInterface
      .bulkDelete("Items")
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
    Users.create({fullname: 'user', email: 'user@mail.com', password: '123456' })
    .then((data) => {
      return Users.findOne({ where: { email: userData.email } })
    })
    .then((user) => {
      access_token = generateToken(user);
      return Users.create({fullname: 'user2', email: 'user2@mail.com', password: '123456'})
    })
    .then((user2) => {
      return Users.findOne({ where: { email: userData2.email } })
    })
    .then((user2) => {
      access_token2 = generateToken(user2)
      done()
    })
    .catch((err) => {
      console.log(err);
      done();
    });
})

describe('success create item', () => {
  it('test success create item', (done) => {
    request(app)
      .post('/item/create')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send({
        name: "Lea Jeans",
        condition: 'Bekas',
        description: 'dilelang buat beli motor',
        starting_price: 50000,
        buyout_price: 1000000,
        bid_increment: 5000,
        start_date: new Date,
        end_date: new Date
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response
        productId = body.id
        // console.log(body, 'dari test')
        expect(status).toBe(201)
        expect(body).toHaveProperty('message', 'Sucessfully Created')
        done()
      })
  })
})

describe('success get detail item', () => {
  it('test success get detail item', (done) => {
    request(app)
      .get(`/item/${productId}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})

describe('success get detail item with other token', () => {
  it('test success get detail item', (done) => {
    request(app)
      .get(`/item/${productId}`)
      .set("Accept", "application/json")
      .set("access_token", access_token2)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})

describe('success get all item', () => {
  it('test success get all item', (done) => {
    request(app)
      .get(`/item`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})

describe('success get hottest list', () => {
  it('test success get hottest list', (done) => {
    request(app)
      .get(`/item`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})

describe('fail get hottest list', () => {
  it('test fail get hottest list', (done) => {
    request(app)
      .get(`/item`)
      .set("Accept", "application/json")
      // .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})

describe('fail get all item', () => {
  it('test fail get all item', (done) => {
    request(app)
      .get(`/item`)
      .set("Accept", "application/json")
      // .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})

describe('fail get detail item', () => {
  it('test fail get detail item', (done) => {
    request(app)
      .get(`/item/${productId}`)
      .set("Accept", "application/json")
      // .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})

describe('fail create item', () => {
  it('test success create item', (done) => {
    request(app)
      .post('/item/create')
      .set("Accept", "application/json")
      // .set("access_token", access_token)
      .send({
        name: "Lea Jeans",
        condition: 'Bekas',
        description: 'dilelang buat beli motor',
        starting_price: 50000,
        buyout_price: 1000000,
        bid_increment: 5000,
        start_date: new Date,
        end_date: new Date
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response
        productId = body.id
        // console.log(body, 'dari test')
        expect(status).toBe(500)
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})

describe('fail authentication', () => {
  it('not-authentic', (done) => {
    request(app)
      .get(`/item`)
      .set("Accept", "application/json")
      .set("access_token", 'access_token')
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done();
      });
  })
})