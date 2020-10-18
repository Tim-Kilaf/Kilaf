const { Items, ItemPictures, Users, Biddings } = require('../models')
const path = require('path')
const SocketHandler = require('../handlers/SocketHandler')
const io = require('../config/io-emitter');

class ItemController {
  constructor(io) {
    this.io = io
  }

  listItem = async (req, res, next) => {
    try {
      const items = await Items.findAll({
        where: {
          status: 'unsold'
        },
        include: [ItemPictures]
      })

      res.status(200).json({ items })
    } catch (errors) {
      return next(errors)
    }
  }

  createItem = async (req, res, next) => {
    try {
      console.log(req.body)
      delete req.body.image
      const payload = {
        ...req.body,
        current_price: req.body.starting_price,
        status: 'unsold',
        UserId: req.user.id
      }

      const item = await Items.create(payload)
      const images = req.files.images

      if (Array.isArray(req.files.images)) {
        for (let i = 0; i < images.length; i++) {
          await ItemPictures.create({
            ItemId: item.id,
            path: `${images[i].name}`
          })
          images[i].mv(path.join(__dirname, `../../client/src/assets/images/${images[i].name}`))
        }
      } else {
        await ItemPictures.create({
          ItemId: item.id,
          path: `${images.name}`
        })
        images.mv(path.join(__dirname, `../../client/src/assets/images/${images.name}`))
      }

      // this.io.emit('bid', (socket) => SocketHandler.newBid(data, socket))

      res.status(201).json({ message: 'Sucessfully Created' })
    } catch (errors) {
      console.log('ini kalo pake arrow function', errors)
      return next(errors)
    }
  }

  detailItem = async (req, res, next) => {
    try {
      console.log(req.params.id)
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

      // this.io.emit('bid', (socket) => SocketHandler.newBid(item, socket))
      // this.op

      let highestBidder = item.Biddings.length > 0 && req.user.id === item.Biddings[0].User.id

      let owner

      if (req.user.id === item.UserId) {
        owner = true
      } else {
        owner = false
      }

      io.emit('test', { item, owner, highestBidder })

      res.status(200).json({ item, owner, highestBidder })
    } catch (errors) {
      console.log(errors)
      return next(errors)
    }
  }
}

module.exports = (io) => new ItemController(io)