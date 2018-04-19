
const getters = {
    loading: (state, getters, rootState) => () => {
      return state.isLoading
    },
    allCoinsUpdated: (state, getters, rootState) => (currency="USD") => {
      return state.lastFetchedUpdateCoins[currency.toUpperCase()]
    },
    valuationsForFiat: (state,getters) => (fiatCurrencySymbol) => {
      return state.valuations.filter( valuation => valuation.fiatCurrencySymbol === fiatCurrencySymbol)
    },
    valuationsForCrytocurrency: (state,getters) => (crytocurrencySymbol) => {
      return state.valuations.filter( valuation => valuation.crytocurrencySymbol === crytocurrencySymbol)
    },
    latestValuationForCryptocurrency: (state, getters, rootState) => (crytocurrencySymbol) => {
      let valuations =  state.valuations.filter( valuation => valuation.symbol === crytocurrencySymbol.toUpperCase())
      let valuation = valuations.reduce( (sum, valuation) => valuation['last_updated'] > sum['last_updated'] ? valuation: sum)
    },
    valuationsForTradingPair: (state, getters) => (crytocurrencySymbol,fiatCurrencySymbol) => {
      return getters.valuationsForFiat(fiatCurrencySymbol).filter( valuation => valuation.crytocurrencySymbol === crytocurrencySymbol)
    }
  }
  
  export default getters