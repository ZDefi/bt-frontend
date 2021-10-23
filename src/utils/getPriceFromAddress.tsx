const getPriceFromAddress = (prices, address) => {
  const token = prices.find(f => f.contract.toLowerCase() === address.toLowerCase())
  if (token) {
    return token.price
  }
  return 0
}

export default getPriceFromAddress
