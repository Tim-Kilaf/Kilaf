const { Items, ItemPictures, Users, Biddings, sequelize } = require('../models')
const { Op } = require('sequelize')
const path = require('path')

class ItemController {
  constructor(io) {
    this.io = io
  }

  listItem = async (req, res, next) => {
    try {
      const items = await Items.findAll({
        where: {
          status: 'unsold',
          start_date: {
            [Op.lte]: new Date() 
          }
        },
        include: [ItemPictures, Users]
      })

      res.status(200).json({ items })
    } catch (err) {
      return next(err)
    }
  }

  listHottest = async (req, res, next) => {
    try {
      let items = await Items.findAll({
        where: {
          status: 'unsold',
          start_date: {
            [Op.lte]: new Date()
          }
        },
        include: [ItemPictures, Biddings, Users]
      })

      items = items.map(item => {
        item = item.get()
        item.bids = item.Biddings.length
        delete item.Biddings

        return item
      }).sort((a, b) => b.bids - a.bids).slice(0, 10)

      res.status(200).json({ items })
    } catch (err) {
      return next(err)
    }
  }

  createItem = async (req, res, next) => {
    try {
      delete req.body.image

      const payload = {
        ...req.body,
        current_price: req.body.starting_price,
        status: 'unsold',
        UserId: req.user.id
      }

      const item = await Items.create(payload)

      if (req.files) {
        const images = req.files.images
  
        if (Array.isArray(req.files.images)) {
          for (let i = 0; i < images.length; i++) {
            await ItemPictures.create({
              ItemId: item.id,
              path: `${images[i].name}`
            })
            images[i].mv(path.join(__dirname, `../../client/public/uploads/${images[i].name}`))
          }
        } else {
          await ItemPictures.create({
            ItemId: item.id,
            path: `${images.name}`
          })
          images.mv(path.join(__dirname, `../../client/public/uploads/${images.name}`))
        }
      }

      res.status(201).json({ message: 'Sucessfully Created', id: item.id })
    } catch (err) {
      return next(err)
    }
  }

  detailItem = async (req, res, next) => {
    try {
      const item = await Items.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: ItemPictures,
            attributes: [ 'id', 'path' ]
          },
          {
            model: Users,
            attributes: [ 'fullname' ]
          },
          {
            model: Biddings,
            attributes: ['id', 'price', 'createdAt'],
            include: [{
              model: Users,
              attributes: ['id', 'fullname']
            }]
          }
        ],
        order: [[ Biddings, 'price', 'DESC' ]]
      })

      this.io.emit('joinRoom', `item-${req.params.id}`)

      let highestBidder = item.Biddings.length > 0 && req.user.id === item.Biddings[0].User.id

      let owner

      if (req.user.id === item.UserId) {
        owner = true
      } else {
        owner = false
      }

      let winner;

      if (typeof item.HighestBiddingId === 'number' && item.HighestBiddingId !== null) {
        winner = item.Biddings[0].User.id
      }

        res.status(200).json({ item, highestBidder, owner, winner })
        
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = (io) => new ItemController(io)