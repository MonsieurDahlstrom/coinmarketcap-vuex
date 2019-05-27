
const getters = {
  crytocurrenciesUpdatedAt: (state, getters, rootState) => (currency="USD") => {
    let lastUpdatedAt = state.lastFetchedUpdateCoins[currency.toUpperCase()]
    return lastUpdatedAt != undefined ? lastUpdatedAt : new Date(0)
  },
  fiatValuations: (state,getters) => (fiatCurrencySymbol="USD") => {
    return state.valuations.filter( valuation => valuation.fiat === fiatCurrencySymbol.toUpperCase())
  },
  cryptocurrencyValuations: (state,getters) => (cryptocurrencySymbol="BTC") => {
    return state.valuations.filter( valuation => valuation.crypto === cryptocurrencySymbol.toUpperCase())
  },
  cryptocurrencyLatestValuation: (state, getters, rootState) => (cryptocurrencySymbol="BTC") => {
    let valuations =  state.valuations.filter( valuation => valuation.crypto === cryptocurrencySymbol.toUpperCase())
    let valuation = valuations.reduce( (sum, valuation) => valuation.date.getTime() > sum.date.getTime() ? valuation: sum, valuations[0])
    return valuation
  },
  tradingPairValuations: (state, getters) => (cryptocurrencySymbol="BTC",fiatCurrencySymbol="USD") => {
    return state.valuations.filter( valuation => valuation.crypto === cryptocurrencySymbol.toUpperCase() && valuation.fiat === fiatCurrencySymbol.toUpperCase())
  }
}

export default getters
