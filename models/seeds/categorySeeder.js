const Record = require('../record')
const mongoose = require('mongoose')
const categoryData = require('./categorys.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  categoryData.forEach(item => {
    Record.create(item)
  })
  console.log('done!')
})