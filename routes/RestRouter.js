const router = require('express').Router()
const controller = require('../controllers/RestController')
const middleware = require('../middleware')

router.post(
  '/newMenu',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createMenu
)

router.get(
  '/newMenu/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getMenu
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

router.get('/menu/:restId', controller.getRestDetails)

router.get('/rest/cat/:itemId', controller.getCatItems)

router.post('/newcuis', controller.createCuis)

router.get('/cuis/:cuis', controller.getCuis)


module.exports = router

