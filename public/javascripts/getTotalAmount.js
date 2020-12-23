function getTotalAmount(records) {
  let totalAmount = 0
  records.forEach(record => totalAmount += Number(record.amount))
  return totalAmount
}

module.exports = getTotalAmount