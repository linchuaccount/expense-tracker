const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const getTotalAmount = require('../../public/javascripts/getTotalAmount')

//類型選單
router.get('/type/:category', (req, res) => {
  const category = req.params.category
  Record.find()
    .lean()
    .then(records => records.filter(record => {
      return record.category.includes(category)
    }))
    .then(records => {
      const totalAmount = getTotalAmount(records)
      res.render('index', { records, totalAmount, category })
    })
    .catch(error => console.log(error))
})

module.exports = router