const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
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
app.use(express.static('public'))

//記帳首頁(瀏覽所有記帳)
app.get('/', (req, res) => {
  Record.find()
  .lean()
  .then( records => res.render('index', { records }))
  .catch(error => console.error(error))
})

//進入新增記帳頁
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

//進入記帳修改頁
app.get('/records/:id/edit', (req,res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})
//接住修改頁的資料後送進MongoDB儲存
app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  req.body.icon = getIcon(req.body.category)
  return Record.findById(id)
    .then(records => {
      Object.assign(records, req.body)
      return records.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// handlebars 自定義 helper; Built-in Helpers => Sub-Expressions
//參考同學做法 客製ifEqual
//options.fn(this) 回傳 {{ifEqual}} 後面的字串
// 客製 equal helper
handlebars.registerHelper('ifEqual', function (category, targetCategory, options) {
  if (category === targetCategory) {
    return options.fn(this)
  }
  return options.inverse(this)
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})