const router = require('express').Router()
const controller = require('../controllers/ApiController')

router.get(
  '/restsByLocation',
  controller.getRestsByLocation
)

module.exports = router
