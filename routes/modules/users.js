const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

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
  //利用emai比對db資料
  User.findOne({ email }).then(user => {
    //有重複的email就退回註冊頁，沒有重複則存入註冊資料
    if (user) {
      req.flash('warning_msg', 'email已被註冊過!')
      res.render('register', {
        name, email, password, confirmPassword
      })
    } else {
      return User.create({
        name, email, password
      })
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