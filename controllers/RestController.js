const { Rest } = require('../models')
const { Menu } = require('../models')
const { User } = require('../models')
const { Item } = require('../models')
const { Category } = require('../models')
const { Order } = require('../models')

const createMenu = async (req, res) => {
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

const createCuis = async (req, res) => {
  console.log('cuisines ' + req.body)
  const user = await User.findById(req.body._id)
  let restaurant = await Rest.findById(user.restId)
  const newCuis = req.body.checkBoxValues
  newCuis.forEach(async (cuis) => {
    await restaurant.updateOne({ $push: { cuisine: cuis } })
  })
  res.send(newCuis)
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
  console.log('this is the reqbody', req.body)
  const newItem = await Item.create({
    name: req.body.formValues.name,
    price: req.body.formValues.price,
    qty: req.body.formValues.qty,
    desc: req.body.formValues.desc,
    pic: req.body.formValues.pic
  })
  await Category.updateOne(
    { _id: req.body.catId },
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
  await restDetails?.menu?.populate({
    path: 'categoryId',
    populate: { path: 'items'}
  })
  const userRest = await User.findOne({ restId: req.params.restId })
  console.log(restDetails)
  const response = {
    restDetails,
    userRest
  }

  res.send(response)
}

const getMenu = async (req, res) => {
  let menuExist
  const user = await User.findById(req.params.id).populate('restId')
  if (user.restId.menu !== null) {
    menuExist = true
  } else {
    menuExist = false
  }

  res.send(menuExist)
}


const getCuis = async (req, res) => {
  let cuisExist
  const user = await User.findById(req.params.cuis)
  let restaurant = await Rest.findById(user.restId)
  if (restaurant.cuisine.length > 0) {
    cuisExist = restaurant.cuisine
  } else {
    cuisExist = false
  }
  res.send(cuisExist)
}


const createOrder = async ( req, res ) => {
  
  console.log(req.body)
  let itemsIds = []
  let total = 0
  for (let i= 0; i < req.body.cart.length; i++){
    itemsIds.push(req.body.cart[i]._id)
    total = total + (req.body.cart[i].userQty * req.body. cart[i].price)
   await Item.updateOne({_id: req.body.cart[i]._id}, 
    { qty: req.body.cart[i].qty - req.body.cart[i].userQty})
  }
  const newCustOrder = await Order.create({
    items: itemsIds,
    total: total,
    userId: req.body.user._id
  })
  const newRestOrder = await Order.create({
    items: itemsIds,
    total: total,
    userId: req.body.r_id
  })

  await User.updateOne(
    { _id: req.body.user._id },
    { $push: { orders: newCustOrder._id }})

  await User.updateOne(
    { _id: req.body.r_id },
    { $push: { orders: newRestOrder._id }})

}
  

const getCatItems = async (req, res) => {
  console.log('catdetails', req.params)
  const catDetails = await (
    await Category.findById(req.params.catId)
  ).populate({
    path: 'items',
    populate: { path: 'categoryId' }
  })
  const catItems = await Category.findOne({ catId: req.params.items })

  console.log(catDetails)
  const response = {
    catDetails,
    catItems
  }

  res.send(response)
}

module.exports = {
  createMenu,
  createCategory,
  createItem,
  getRestDetails,
  getMenu,
  getCatItems,
  createCuis,
  getCuis,
  createOrder

}
