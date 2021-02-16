const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const getTotalAmount = require('../../public/javascripts/getTotalAmount')

//類型選單
// router.get('/', (req, res) => {
//   let category = req.query.category
//   let month = req.query.month
//   const userId = req.user._id
//   Record.find({ userId: userId })
//     .lean()
//     .then(records => records.filter(record => {
//       return record.category.includes(category)
//     }))
//     .then(records => {
//       const totalAmount = getTotalAmount(records)
//       res.render('index', { records, totalAmount, category, month })
//     })
//     .catch(error => console.log(error))
// })

router.get('/', (req, res) => {
  let category = req.query.category
  let month = req.query.month
  const userId = req.user._id
  Record.find({ userId: userId })
    .lean()
    .then(allRecords => {
      // console.log('1', allRecords)
      if (category === '所有分類') {
        records = allRecords
        // console.log('2', records)
      } else {
        records = allRecords.filter(record => { return record.category.includes(category) })
        // console.log('3', records)
      }
      if (month === '所有月份') {
        records = records
        // console.log('4', records)
      } else {
        records = records.filter((record) => {
          let recordMonth = (new Date(record.date).getMonth() + 1).toString()
          console.log(record.date)
          console.log(new Date(record.date))
          console.log(new Date(record.date).getMonth())
          console.log(recordMonth)
          return recordMonth.includes(month)
        })
        // console.log('5', records)
      }
      const totalAmount = getTotalAmount(records)

      res.render('index', { records, totalAmount, category, month })
    })

    .catch(error => console.log(error))
})

module.exports = router