const { Item, ItemPicture } = require('../models')
const path = require('path')

class ItemController {
  static async listItem(req, res, next) {

  }

  static async createItem(req, res, next) {
    try {      
      const images = req.files.images
      
      for(let i = 0; i < images.length;i++) {
        images[i].mv(path.join(__dirname, `../../client/src/assets/images/${images[i].name}`))
      }
      res.status(201).json({msg: req.files})
    } catch(errors) {
      next(errors)
    }
  }
}

module.exports = ItemController