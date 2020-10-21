const request = require('supertest')
const app = require('../app')
const { Users, Items, sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken');
const CronController = require('../controllers/CronController');

let userId = ''
let itemId = ''
let unsoldItemId = ''
let access_token = ''
let wrong_access_token = ''
let resolveId = ''

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
        end_date: new Date(),
        buyout_date: null
    }

    const unsoldItem = {
        HighestBiddingId: null,
        CategoryId: 1,
        name: 'unsold item',
        status: 'unsold',
        condition: 'bekas',
        description: 'bajubekas',
        starting_price: 10000,
        current_price: 10000,
        buyout_price: 100000,
        bid_increment: 1000,
        start_date: new Date(), // current date-time
        end_date: new Date(),
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
            access_token = jwt.sign({ id: user.id, email: user.email }, 'indomie')
            wrong_access_token = access_token + 'bbbbbb'
            return Items.create(item)
        })
        .then(res => {
            console.log(res);
            itemId = res.id
            return Items.create(unsoldItem)
        })
        .then(res => {
            console.log(res);
            unsoldItemId = res.id
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

describe("test cron controller", function() {
    it("get item where end_date <= now", async function (done) {
        request(app)
        .post('/biddings')
        .set('access_token', access_token)
        .send({ ItemId: itemId, price: 11000, UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then(async (response) => {
            const { body, status } = response
            console.log('create biddings');
            // console.log(body);
            // console.log(status);
            const getAll = await CronController.getWinningBids()
            // console.log(getAll,'winingbids');
            expect(getAll).toEqual(expect.anything())
            done()
        })
    })

    it("resolve winning bid to transaction", async function (done) {
        request(app)
        .post('/biddings')
        .set('access_token', access_token)
        .send({ ItemId: itemId, price: 12000, UserId: userId })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then( async (response) => {
            const { body, status } = response
            // console.log(response);
            console.log('create biddings resolve');
            // console.log(body);
            // console.log(status);
    

            const getAll = await CronController.getWinningBids()
            getAll.forEach(async(el) => {
                if (el.Biddings.length > 0) {
                    const resolveBid = await CronController.bidTransaction(el.id)
                    // console.log(resolveBid);
                    expect(resolveBid).toEqual(expect.anything())
                    done()
                }
            })
            
        })
    })

    it("resolve no bids", async function (done) {
        const getAll = await CronController.getWinningBids()
        console.log(getAll,'nobids getall');
        getAll.forEach(async (el) => {
            // console.log(el.id);
            // console.log(el.Biddings);
            if (el.Biddings.length < 1) {
                console.log(el.id, 'nobids id');
                const noBids = await CronController.noBids(el.id)
                console.log(noBids,'noBids');
                expect(noBids).toEqual(expect.anything())
                done()
            }
        })
        
    })
})