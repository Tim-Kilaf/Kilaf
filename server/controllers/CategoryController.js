const { Categories, Items, ItemPictures, Users, Biddings } = require('../models')
const path = require('path')

class CategoryController {
    constructor(io) {
        this.io = io
    }

    listCategories = async (req,res,next) => {
        try {
            const result = await Categories.findAll()
            // console.log(result);
            res.status(200).json({result})
        } catch (error) {
            console.log(error, '===============');
            return next(error)
        }
    }

    getItemByCategory = async (req,res,next) => {
        try {
            const categoryId = req.params.categoryId
            const items = await Categories.findOne({
                where: {
                    id: categoryId
                },
                include: [
                    {
                    model: Items,
                    include: [
                        {
                            model: ItemPictures,
                            attributes: [ 'id', 'path' ]
                        },
                        {
                            model: Users,
                            attributes: [ 'fullname' ]
                        }
                    ]
                    }
                ]
            })
            res.status(200).json({items})
        } catch (error) {
            // console.log(error);
            return next(error)
        }
        
    }
}

module.exports = (io) => new CategoryController(io)