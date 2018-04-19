import * as MutationTypes from './mutation-types'
import * as coinmarketcap from 'coinmarketcap'
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
  if(getters.allCoinsUpdated(options.currency) > fiveMinutesAgo) return
  /** check which parameters were set */
  let parameters = {}
  if(options.currency) parameters.convert = options.currency
  if(options.limit) parameters.limit = options.limit
  /** Retrive results and stire them */
  commit(MutationTypes.TOGGLE_LOADING)
  let result = await coinmarketcap.ticker(parameters)
  if(result.length > 0) {
    for(let valuation of result) {
      let name = valuation["name"]
      let date = new Date( parseInt(valuation["last_updated"]) * 1000)
      commit(MutationTypes.ADD_CURRENCY_VALUATION, {valuation: valuation})
    }
    /** Finally update the */
    commit(MutationTypes.SET_LAST_FETCH_UPDATE_COINS, {currency: options.currency ? options.currency: "USD", date: new Date()})
  }
  commit(MutationTypes.TOGGLE_LOADING)
}

/**
retrives the latest statistics about a cryptocurrency
  payload must contain:
    currency: the fiat to return values in
**/
export async function updateCoin ({ state, commit, rootState }, options) {

}
