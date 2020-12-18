const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const handlebars = require('handlebars')
const getIcon = require('../../public/javascripts/geticon')

//進入新增記帳頁
router.get('/new', (req, res) => {
  res.render('new')
})
//把新增記帳資料送進MongoDB儲存
router.post('/', (req, res) => {
  req.body.icon = getIcon(req.body.category)
  // console.log(req.body)
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//進入記帳修改頁
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})
//接住修改頁的資料後送進MongoDB儲存
router.put('/:id', (req, res) => {
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
//刪除記帳資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// handlebars 自定義 helper,關鍵字Built-in Helpers => Sub-Expressions
//參考同學做法 客製ifEqual
//options.fn(this) 回傳 {{ifEqual}} 後面的字串
// 客製 equal helper
handlebars.registerHelper('ifEqual', function (category, targetCategory, options) {
  if (category === targetCategory) {
    return options.fn(this)
  }
  return options.inverse(this)
})

module.exports = router