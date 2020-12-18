const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const categorys = require('./modules/categorys')

router.use('/', home)
router.use('/records', records)
router.use('/', categorys)

module.exports = router