import * as MutationTypes from './mutation-types'
import * as coinmarketcap from 'coinmarketcap'
// TODO:
// replace marketcap lib with a fetch https://api.coinmarketcap.com/v1/ticker/?
import 'isomorphic-fetch'

/**
  retrives the latest statistics about cryptocurrencies
  payload may contain:
    currency: the fiat to return values in
    limit = number of currencies to be returned, based upon market capitalisation
**/
export async function updateCoins ({ getters, state, commit, rootState }, options) {
  /** coinmarketcap updated only every fifth minute no need to check if last update is within range */
  var fiveMinutesAgo = new Date( Date.now() - 5000 * 60 );
  if(getters.crytocurrenciesUpdatedAt(options.currency) > fiveMinutesAgo) return
  /** check which parameters were set */
  let parameters = {}
  if(options.currency) parameters.convert = options.currency
  if(options.limit) parameters.limit = options.limit
  /** Retrive results and stire them */
  commit(MutationTypes.TOGGLE_LOADING, {})
  try {
    let result = await coinmarketcap.ticker(parameters)
    if(result.length > 0) {
      for(let valuation of result) {
        let crypto = valuation["symbol"].toUpperCase()
        let fiat = options.currency ? options.currency.toUpperCase() : "USD"
        let date = new Date( parseInt(valuation["last_updated"]) * 1000)
        let rate = valuation[`price_${fiat.toLowerCase()}`]
        commit(MutationTypes.ADD_CURRENCY_VALUATION, {crypto: crypto, fiat: fiat, date: date, rate: rate, info:valuation})
      }
      /** Finally update the */
      let fiat = options.currency ? options.currency.toUpperCase() : "USD"
      commit(MutationTypes.SET_LAST_FETCH_UPDATE_COINS, {currency: fiat, date: new Date()})
    }
  } catch(err) {
    console.error(err)
  }finally {
    commit(MutationTypes.TOGGLE_LOADING,{})
  }
}

/**
retrives the latest statistics about a cryptocurrency
  payload must contain:
    currency: the fiat to return values in
**/
export async function updateCoin ({ state, commit, rootState }, options) {

}
