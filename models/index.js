const mongoose = require('mongoose')
const userSchema = require('./User')
const orderSchema = require('./Order')
const restSchema = require('./Restaurant')
const menuSchema = require('./Menu')

const User = mongoose.model('User', userSchema)
const Order = mongoose.model('Order', orderSchema)
const Rest = mongoose.model('Rest', restSchema)
const Menu = mongoose.model('Menu', menuSchema)

module.exports = {
  User,
  Order,
  Rest,
  Menu
}