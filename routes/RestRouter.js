const router = require('express').Router()
const controller = require('../controllers/RestController')
const middleware = require('../middleware')

router.post(
  '/newMenu',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createMenu
)

router.post(
  '/newCategory',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createCategory
)

router.post(
  '/newItem',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createItem
)

router.get(
  '/menu/:restId',
  controller.getRestDetails
)
module.exports = router
