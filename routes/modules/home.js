const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//記帳首頁(瀏覽所有記帳)
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      { records.forEach(record => totalAmount += Number(record.amount)) }
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router