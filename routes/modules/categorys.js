const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//類型選單
router.get('/type/:category', (req, res) => {
  const category = req.params.category
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => records.filter(record => {
      return record.category.includes(category)
    }))
    .then(records => {
      { records.forEach(record => totalAmount += Number(record.amount)) }
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router