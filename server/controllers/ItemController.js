const { Items, ItemPictures, Users, Biddings } = require('../models')
const path = require('path')

class ItemController {
  static async listItem(req, res, next) {
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

  static async createItem(req, res, next) {
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


      res.status(201).json({ message: 'Sucessfully Created' })
    } catch (errors) {
      console.log(errors)
      return next(errors)
    }
  }

  static async detailItem(req, res, next) {
    try {
      const item = await Items.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model:ItemPictures,
            attributes: [ 'id', 'path' ]
          }, 
          {
            model: Users,
            attributes: [ 'fullname' ]
          },
          {
            model: Biddings,
            // order masih bug
            attributes: ['id', 'price', 'createdAt'],
            include: [{
              model: Users,
              attributes: ['id', 'fullname']
            }]
          }
        ],
        order: [[ Biddings, 'price', 'DESC' ]]
      })

      let owner

      if (req.user.id === item.UserId) {
        owner = true
      } else {
        owner = false
      }

      res.status(200).json({ item, owner })
    } catch (errors) {
      console.log(errors)
      return next(errors)
    }
  }
}

module.exports = ItemController