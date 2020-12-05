const Record = require('../record')
const mongoose = require('mongoose')
const recordData = require('./records.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  //參考同學作業 forEach
  recordData.forEach( item => {
    Record.create(item)
  })
  console.log('done!')
  
  //關閉db
  .then(() => db.close())
})