import * as MutationTypes from './mutation-types'
import coinmarketcap from 'coinmarketcap'


/**
  retrives the latest statistics about cryptocurrencies
  payload must contain:
    currency: the fiat to return values in
  payload may contain:
    limit = number of currencies to be returned, decided by marketcap
**/
export async function updateCoins ({ state, commit, rootState }, payload) {

}

/**
retrives the latest statistics about a cryptocurrency
  payload must contain:
    currency: the fiat to return values in
**/
export async function updateCoin ({ state, commit, rootState }, date) {

}
