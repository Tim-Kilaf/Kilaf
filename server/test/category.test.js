const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/jwt");
const { sequelize, Users } = require("../models");
const { queryInterface } = sequelize;



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
      console.log(data)
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


describe('success get category list', () => {
  it('test success get categories', (done) => {
    request(app)
      .get('/category')
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response
        // console.log(body, 'dari test')
        const expected = {foo: 'bar'}
        expect(body).toEqual(expect.not.objectContaining(expected))
        done()
      })
  })
})

describe('success get category by id', () => {
    it('test success get category by id', (done) => {
      request(app)
        .get('/category/1')
        .set("Accept", "application/json")
        .set("access_token", access_token)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response
          // console.log(body, 'dari test')
          const expected = {foo: 'bar'}
          expect(body).toEqual(expect.not.objectContaining(expected))
          done()
        })
    })
  })