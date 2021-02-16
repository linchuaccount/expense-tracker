const Record = require('../record')
const User = require('../user')
const categoryData = require('./categorys.json')

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

//參考同學寫法，把user傳到下一個middleware就可以拿到userId
db.once('open', () => {
  User.create(
    {
      name: 'user2',
      email: 'user2@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null) //參考教案寫法
    })
    .then(user => {
      const userId = user._id
      return Array.from({ length: 10 }).map((_, index) => Record.create({
        "name": "便當-" + index,
        "category": "餐飲食品",
        "date": "2020-" + index + "-1",
        "amount": 100 + 100 * index,
        "icon": "fa-utensils",
        "merchant": "便當店",
        "userId": userId
      }))
    })
    .then(() => console.log('done!'))
})
