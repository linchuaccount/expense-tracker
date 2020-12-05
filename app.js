const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const getIcon = require('./public/javascripts/geticon.js')

const app = express()

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

//記帳首頁(瀏覽所有記帳)
app.get('/', (req, res) => {
  Record.find()
  .lean()
  .then( records => res.render('index', { records }))
  .catch(error => console.error(error))
})

//新增記帳頁
app.get('/records/new', (req, res) => {
  res.render('new')
})
//把新增記帳資料送進MongoDB儲存
app.post('/records', (req, res) => {
  req.body.icon = getIcon(req.body.category)
  // console.log(req.body)
  Record.create( req.body )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})