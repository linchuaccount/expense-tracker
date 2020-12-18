function getIcon(category) {
  //參考同學寫法 switch
  switch (category) {
    case '家居物業':
      return 'fa-home'
      break
    case '交通出行':
      return 'fa-shuttle-van'
      break
    case '休閒娛樂':
      return 'fa-grin-beam'
      break
    case '餐飲食品':
      return 'fa-utensils'
      break
    case '其他':
      return 'fa-pen'
      break
  }
}

//要記得module.exports出去!
//不然會顯示getIcon is not a function T_T
module.exports = getIcon