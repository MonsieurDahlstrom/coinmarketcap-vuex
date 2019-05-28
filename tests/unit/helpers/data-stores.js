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
      let valuation = {crypto: crypto, fiat: fiat, date: date, rate: rate, info:valuationData}
      results.push(valuation)
    }
    return results
  },

  StoreWithUSDValuations() {
    let store = new Vuex.Store({state: {}, modules: {coinmarketcap: coinmarketcapModule}})
    store.state.coinmarketcap.valuations = Stores.valuationsForUSD()
    return store
  },

  valuationForUSD() {
    let crypto = sampleValuationsUSD[0]["symbol"].toUpperCase()
    let fiat = "USD"
    let date = new Date( parseInt(sampleValuationsUSD[0]["last_updated"]) * 1000)
    let rate = sampleValuationsUSD[0][`price_${fiat.toLowerCase()}`]
    return {crypto: crypto, fiat: fiat, date: date, rate: rate, info:sampleValuationsUSD[0]}
  }
}

export default Stores
