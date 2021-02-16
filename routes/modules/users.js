const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
//登入
router.get('/login', (req, res) => {
  res.render('login')
})
//加入middleware，利用passport提供的authenticate驗證登錄資料
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

//註冊
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  //取出表單收到的資料
  const { name, email, password, confirmPassword } = req.body
  //註冊資料錯誤提示
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼和確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }
  //利用emai比對db資料，有重複的email就退回註冊頁，沒有重複則存入註冊資料
  User.findOne({ email }).then(user => {
    if (user) {
      req.flash('warning_msg', '此email已被註冊過!')
      return res.render('register', {
        name, email, password, confirmPassword
      })
    } else {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name, email, password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

//登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出!')
  res.redirect('/users/login')
})

module.exports = router