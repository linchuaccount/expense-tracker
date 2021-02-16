const Record = require('../record')
const User = require('../user')
const recordData = require('./records.json')

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  User.create(
    {
      name: 'user1',
      email: 'user1@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null)
    })
    .then(user => {
      const userId = user._id
      return Array.from({ length: 6 }, (_, index) =>
        Record.create({
          ...recordData[index], userId
        })
      )
    })
    .then(() => console.log('done!'))
})