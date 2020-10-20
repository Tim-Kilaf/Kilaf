const request = require('supertest')
const app = require('../app')
const { Users, Items, sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')

let userId = ''
let itemId = ''
let access_token = ''
let wrong_access_token = ''

afterAll((done) => {
    queryInterface.bulkDelete("Biddings")
        .then(res => {
            console.log(res, 'deleted bidding');
            return queryInterface.bulkDelete("Items")
        })
        .then(res => {
            console.log(res, 'deleted items');
            return queryInterface.bulkDelete("Users")
        })
        .then(res => {
            console.log(res, 'deleted users');
            done()
        })
        .catch((err) => {
            console.log(err);
            done()
        });
});

beforeAll((done) => {
    const items = {
        HighestBiddingId: null,
        CategoryId: 1,
        name: 'baju bekas',
        status: 'unsold',
        condition: 'bekas',
        description: 'bajubekas',
        starting_price: 10000,
        current_price: 10000,
        buyout_price: 100000,
        bid_increment: 1000,
        start_date: new Date(), // current date-time
        end_date: new Date(Date.now() + 24*60*60*1000), // current date-time + 1 day
        buyout_date: null
    }

    

    Users.create({
        fullname: 'Budi Santoso',
        email: 'budi@mail.com',
        password: '123456',
        RoleId: 2
    })
        .then(user => {
            console.log(user);
            userId = user.id
            console.log(userId);
            access_token = jwt.sign({ id: user.id, email: user.email }, 'kopiliong')
            wrong_access_token = access_token + 'bbbbbb'
            return Items.create(items)
        })
        .then(res => {
            console.log(res);
            itemId = res.id
            done()
        })
        .catch(err => {
            console.log(err);
            done()
        })
    
})

describe("test bid on Item", function() {
    it("test success bid +1000 on item", function (done) {
        request(app)
        .post('/biddings')
        .set('access_token', access_token)
        .send({ ItemId: itemId, price: 11000, UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty("message", expect.any(String))
            done()
        })
    })

    it("test fail bid on item: price = string", function (done) {
        request(app)
        .post('/biddings')
        .set('access_token', access_token)
        .send({ ItemId: itemId, price: 'ee', UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(500)
            // expect(body).toHaveProperty("message", expect.any(String))
            done()
        })
    })

    it("test fail bid on item: wrong access_token", function (done) {
        request(app)
        .post('/biddings')
        .set('access_token', wrong_access_token)
        .send({ ItemId: itemId, price: 11000, UserId: '' })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(500)
            // expect(body).toHaveProperty("message", expect.any(String))
            done()
        })
    })

    it("test fail bid on item: no itemId", function (done) {
        request(app)
        .post('/biddings')
        .set('access_token', access_token)
        .send({ ItemId: '', price: 11000, UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(500)
            // expect(body).toHaveProperty("message", expect.any(String))
            done()
        })
    })
})


