import * as MutationTypes from './mutation-types'

const mutations = {

  [MutationTypes.ADD_CURRENCY_VALUATION] (state,payload) {
    let index = state.indexes.findIndex( item => item === payload.index)
    index < 0 ? state.indexes.push(payload.index) : state.indexes.splice(index,1,payload.index)
  },

  [MutationTypes.REMOVE_CURRENCY_VALUATION] (state,payload)  {
    let index = state.indexes.findIndex( item => item === payload.index)
    if(index >= 0)
      state.indexes.splice(index,1)
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