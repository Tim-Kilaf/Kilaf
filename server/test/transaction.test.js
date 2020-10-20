const request = require('supertest')
const app = require('../app')
const { Users, Items, sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')

let userId = ''
let itemId = ''
let buyoutItemId = ''
let access_token = ''
let wrong_access_token = ''

beforeAll((done) => {
    const item = {
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

    const buyoutItem = {
        HighestBiddingId: null,
        CategoryId: 1,
        name: 'buyout item',
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
            return Items.create(item)
        })
        .then(res => {
            console.log(res);
            itemId = res.id
            return Items.create(buyoutItem)
        })
        .then(res => {
            console.log(res);
            buyoutItemId = res.id
            done()
        })
        .catch(err => {
            console.log(err);
            done()
        })
    
})

afterAll((done) => {
    queryInterface.bulkDelete("Transactions")
        .then(res => {
            console.log(res, 'deleted transactions');
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

// this endpoint to create transaction is the exact same as te on eused in CRON job to resolve winning bids
describe("create transaction", function() {
    it("create transaction", function (done) {
        request(app)
        .post('/biddings')
        .set('access_token', access_token)
        .send({ ItemId: itemId, price: 11000, UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response
            console.log('create biddings');
            console.log(body);
            console.log(status);

            return request(app)
            .post(`/transaction/create/${itemId}`)
            .set('access_token', access_token)
            // .send({ ItemId: itemId, price: 11000, UserId: userId })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
        })
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(201)
            console.log(body);
            // expect(body).toHaveProperty("message", expect.any(String))
            done()
        })
    })
})

describe("test buyout function", function() {
    it("user hits buyout", function (done) {
        request(app)
        .get(`/transaction/buyout/${buyoutItemId}`)
        .set('access_token', access_token)
        // .send({ ItemId: itemId, price: 11000, UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(201)
            console.log(body);
            // expect(body).toHaveProperty("message", expect.any(String))
            done()
        })
    })
})

describe("read transaction", function() {
    it("get user cart", function (done) {
        request(app)
        .get('/transaction')
        .set('access_token', access_token)
        // .send({ ItemId: itemId, price: 11000, UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response
            expect(status).toBe(200)
            console.log(body);
            // expect(body).toHaveProperty("message", expect.any(String))
            done()
        })
    })
})