const { Rest } = require('../models')
const { Menu } = require('../models')
const { User } = require('../models')

const createMenu = async (req, res) => {
  const user = await User.findById(req.body.user._id)
  console.log(user)
  if(user.type === "restaurant"){
    let restaurant = await Rest.findById(user.restId)
    console.log(restaurant)
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

module.exports = {
  createMenu
}
