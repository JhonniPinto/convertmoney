const router     = require('express').Router()
const index      = require('../controllers/index')
const convertido = require('../controllers/convertido')

router.get('/', index)

router.get('/convertido', convertido)

module.exports = router