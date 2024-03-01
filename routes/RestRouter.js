const router = require('express').Router()
const controller = require('../controllers/RestController')
const middleware = require('../middleware')

router.post(
  '/newMenu',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createMenu
)

module.exports = router
