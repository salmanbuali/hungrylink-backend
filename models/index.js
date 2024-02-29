const mongoose = require('mongoose')
const userSchema = require('./User')
const orderSchema = require('./Order')
const restSchema = require('./Restaurant')
const menuSchema = require('./Menu')
const categorySchema = require('./Category')
const itemSchema = require('./Item')

const User = mongoose.model('User', userSchema)
const Order = mongoose.model('Order', orderSchema)
const Rest = mongoose.model('Rest', restSchema)
const Menu = mongoose.model('Menu', menuSchema)
const Category = mongoose.model('Category', categorySchema)
const Item = mongoose.model('Item', itemSchema)

module.exports = {
  User,
  Order,
  Rest,
  Menu,
  Category,
  Item
}