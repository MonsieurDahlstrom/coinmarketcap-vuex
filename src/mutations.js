import * as MutationTypes from './mutation-types'

const mutations = {

  [MutationTypes.ADD_CURRENCY_VALUATION] (state,payload) {
    let index = state.valuations.findIndex( item => {
      return item.fiat === payload.fiat && item.crypto === payload.crypto && item.date.getTime() === payload.date.getTime()
    })
    if(index < 0)
      state.valuations.push(payload)
  },

  [MutationTypes.REMOVE_CURRENCY_VALUATION] (state,payload)  {
    let index = state.valuations.findIndex( item => {
      return item.fiat === payload.fiat && item.crypto === payload.crypto && item.date.getTime() === payload.date.getTime()
    })
    if(index >= 0)
      state.valuations.splice(index,1)
  },

  [MutationTypes.TOGGLE_LOADING] (state)  {
    state.isLoading = !state.isLoading
  },

  [MutationTypes.SET_LAST_FETCH_UPDATE_COINS] (state,payload)  {
    if(payload.currency) {
      state.lastFetchedUpdateCoins[payload.currency.toUpperCase()] = payload.date
    } else {
      state.lastFetchedUpdateCoins["USD"] = payload.date
    }
  }
}

export default mutations
