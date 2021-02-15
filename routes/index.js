const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const categorys = require('./modules/categorys')
const users = require('./modules/users')


router.use('/users', users)
router.use('/records', records)
router.use('/', home)
router.use('/', categorys)



module.exports = router