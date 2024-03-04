const { User } = require('../models')
const { Rest } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password, name, type, avatar, contact, address } = req.body
    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      if (type === 'restaurant') {
        const typeRest = await Rest.create({
          menu: null,
          cuisine: []
        })
        const restId = typeRest._id
        const user = await User.create({
          name,
          email,
          passwordDigest,
          type,
          avatar,
          contact,
          address,
          restId
        })
        res.send(user)
      } else {
        const user = await User.create({
          name,
          email,
          passwordDigest,
          type,
          avatar,
          contact,
          address
        })
        res.send(user)
      }
    }
  } catch (error) {
    throw error
  }
}
const Login = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password } = req.body
    // Finds a user by a particular field (in this case, email)
    const user = await User.findOne({ email })
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    // If they match, constructs a payload object of values we want on the front end
    if (matched) {
      if (user.type === 'restaurant') {
        await user.populate('restId')

        await user.populate('orders')

        await user.restId.populate('menu')

        // if (user.restId.menu != null) {
        //   for (let i = 0; i < user.restId.menu.categoryId.length; i++) {
        //     await user.restId.menu.categoryId.populate(categoryId[i])
        //   }
        // }

        let payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          type: user.type,
          contact: user.contact,
          address: user.address,
          orders: user.orders,
          restId: user.restId
        }
        let token = middleware.createToken(payload)
        return res.send({ user: payload, token })
      } else {
        await user.populate('orders')
        console.log('this is populate', user)
        let payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          type: user.type,
          contact: user.contact,
          address: user.address,
          orders: user.orders
        }
        let token = middleware.createToken(payload)
        return res.send({ user: payload, token })
      }
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { oldPassword, newPassword } = req.body
    // Finds a user by a particular field (in this case, the user's id from the URL param)
    let user = await User.findById(req.params.user_id)
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )
    // If they match, hashes the new password, updates the db with the new digest, then sends the user as a response
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        type: user.type,
        contact: user.contact,
        address: user.address,
        orders: user.orders
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession
}
