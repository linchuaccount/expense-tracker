const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const getTotalAmount = require('../../public/javascripts/getTotalAmount')

//記帳首頁(瀏覽所有記帳)
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId: userId })
    .lean()
    .then(records => {
      // console.log(records)
      const totalAmount = getTotalAmount(records)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router