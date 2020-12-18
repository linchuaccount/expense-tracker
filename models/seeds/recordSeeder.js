const Record = require('../record')
const recordData = require('./records.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  //參考同學作業 forEach
  recordData.forEach(item => {
    Record.create(item)
  })
  console.log('done!')
})