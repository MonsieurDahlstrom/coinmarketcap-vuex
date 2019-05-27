import Vue from 'vue'
import Vuex from 'vuex'

import coinmarketcapModule from '../../../src'

Vue.use(Vuex)

import sampleValuationsUSD from '../data/coinmarketcap-ticker-response-usd.json'

const Stores = {
  valuationsForUSD() {
    let results = new Array()
    for(let valuationData of sampleValuationsUSD) {
      let crypto = valuationData["symbol"].toUpperCase()
      let fiat = "USD"
      let date = new Date( parseInt(valuationData["last_updated"]) * 1000)
      let rate = valuationData[`price_${fiat.toLowerCase()}`]
      let valuation = {crypto: crypto, fiat: fiat, date: date, rate: rate, info:valuation}
      results.push(valuation)
    }
    return results
  },

  StoreWithUSDValuations() {
    let store = new Vuex.Store({state: {}, modules: {coinmarketcap: coinmarketcapModule}})
    store.state.coinmarketcap.valuations = Stores.valuationsForUSD()
    return store
  }
}

export default Stores
