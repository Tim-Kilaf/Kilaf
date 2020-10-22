const request = require('supertest')
const app = require('../app')
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll((done) => {
    queryInterface
      .bulkDelete("Users")
      .then(() => done())
      .catch((err) => {
        console.log(err);
        done();
    });
});

//Success Test

describe("test user REGISTER with POST /register", function() {
    it("test success register responds with json", function (done) {
        request(app)
        .post('/auth/register')
        .send({ fullname: "alitongtong", email: "alitong2@mail.com", password: "123456" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then( async (response) => {
            const { body, status } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("email", expect.any(String))
            expect(body).toHaveProperty("role", expect.any(String))
            done()
        })
    })
})
describe("test user LOGIN with POST /login", function () {
    it("test success login responds with json", function (done) {
      request(app)
        .post("/auth/login")
        .send({ email: "alitong2@mail.com", password: "123456" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then( async (response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          done();
        });
    });
  });

// Fail Test

describe("test user fail LOGIN with POST /login", function () {
  it("test fail LOGIN invalid password responds with json", function (done) {
    request(app)
      .post("/auth/login")
      .send({ email: "admin@mail.com", password: "12345" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then( async (response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(["Whoops, something happened on our end!"]);
        done();
      });
  });
  it("test fail LOGIN invalid email responds with json", function (done) {
    request(app)
      .post("/auth/login")
      .send({ email: "admin2@mail.com", password: "123456" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(["Whoops, something happened on our end!"]);
        done();
      });
  });
  it("test fail LOGIN because empty email and password responds with json", function (done) {
    request(app)
      .post("/auth/login")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then( async (response) => {
        const { body, status } = response;
        expect(status).toBe(500);
        expect(body).toEqual(["Whoops, something happened on our end!"]);
        done();
      });
  });
  it("test fail LOGIN because wrong password responds with json", function (done) {
    request(app)
      .post("/auth/login")
      .send({ email: "alitong2@mail.com", password: "12345" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then( async (response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toEqual(["Invalid email or password"]);
        done();
      });
  });
});

describe("test user fail REGISTER with POST /register", function () {
    it("test fail REGISTER because empty fullname responds with json", function (done) {
      request(app)
        .post("/auth/register")
        .send({ fullname: '', email: "admin@mail.com", password: "123456" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then( async (response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain('Validation error: Name Must Be Filled')
          done();
        });
    });
    it("test fail REGISTER because empty email responds with json", function (done) {
        request(app)
          .post("/auth/register")
          .send({ fullname: 'Snowman', email: "", password: "123456" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then( async (response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toContain('Validation error: Email Must Be Filled')
            done();
        });
    });
    it("test fail REGISTER because wrong email format responds with json", function (done) {
        request(app)
          .post("/auth/register")
          .send({ fullname: 'Snowman', email: "adminmail.com", password: "123456" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then( async (response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toContain('Validation error: Please Insert Email Format');
            done();
        });
    });
    it("test fail REGISTER because empty password responds with json", function (done) {
        request(app)
          .post("/auth/register")
          .send({ fullname: 'Snowman', email: "admin@mail.com", password: "" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then( async (response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toContain('Validation error: Password Must Be Filled')
            done();
        });
    });
    it("test fail REGISTER because password less than 6 characters responds with json", function (done) {
        request(app)
          .post("/auth/register")
          .send({ fullname: 'Snowman', email: "admin@mail.com", password: "12345" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then( async (response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toContain('Validation error: Password Minimum 6 Characters')
            done();
        });
    });
    it("test fail REGISTER because email has already exist responds with json", function (done) {
        request(app)
          .post("/auth/register")
          .send({ fullname: 'Snowman', email: "alitong2@mail.com", password: "123456" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then( async (response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toContain('unique violation: email must be unique')
            done();
        });
    });
});