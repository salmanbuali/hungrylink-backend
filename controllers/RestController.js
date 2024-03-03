const { Rest } = require('../models')
const { Menu } = require('../models')
const { User } = require('../models')
const { Item } = require('../models')
const { Category } = require('../models')

const createMenu = async (req, res) => {
  console.log(req)
  const user = await User.findById(req.body._id)
  console.log(user)
  if (user.type === 'restaurant') {
    let restaurant = await Rest.findById(user.restId)
    const newMenu = await Menu.create({
      restaurant: restaurant._id
    })
    restaurant = await Rest.findOneAndUpdate(
      { _id: restaurant._id },
      { menu: newMenu._id }
    )
    res.send(restaurant)
  }
}

const createCategory = async (req, res) => {
  const user = await User.findById(req.body.user._id)
  const restaurant = await Rest.findById(user.restId)
  const menu = await Menu.findById(restaurant.menu)
  const newCategory = await Category.create({
    name: req.body.categoryName
  })
  const updatedmenu = await Menu.updateOne(
    { _id: menu._id },
    { $push: { categoryId: newCategory } }
  )

  res.send(newCategory)
}

const createItem = async (req, res) => {
  const newItem = await Item.create({
    name: req.body.itemName,
    price: req.body.price,
    qty: req.body.qty,
    desc: req.body.desc.split(','),
    pic: req.body.itemPic
  })
  await Category.updateOne(
    { _id: req.body.categoryId },
    { $push: { items: newItem._id } }
  )
  res.send(newItem)
}

const getRestDetails = async (req, res) => {
  const restDetails = await (
    await Rest.findById(req.params.restId)
  ).populate({
    path: 'menu',
    populate: { path: 'categoryId' }
  })
  const userRest = await User.findOne({ restId: req.params.restId })
  // await restDetails.populate('menu')

  // if (restDetails.menu.categoryId != null) {
  //   const menu = await Menu.findById(restDetails.menu._id)
  //   console.log(menu)
  //   for (let i = 0; i < menu.categoryId.length; i++) {
  //     await menu.categoryId.populate(menu.categoryId[i])
  //   }
  //   console.log(restDetails)
  // }
  console.log(restDetails)
  const response = {
    restDetails,
    userRest
  }

  res.send(response)
}

const getCategories = async (req, res) => {
  const menu = await Menu.findById(req.body.menuId)
}

module.exports = {
  createMenu,
  createCategory,
  createItem,
  getRestDetails
}
