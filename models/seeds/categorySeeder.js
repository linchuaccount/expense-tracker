const Record = require('../record')
const categoryData = require('./categorys.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  categoryData.forEach(item => {
    Record.create(item)
  })
  console.log('done!')
})