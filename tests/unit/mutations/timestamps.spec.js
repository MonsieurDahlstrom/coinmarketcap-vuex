import 'babel-polyfill'
//
import {expect} from 'chai'
//
import Mutations from '../../../src/mutations'
const { SET_LAST_FETCH_UPDATE_COINS } = Mutations
//
import DataStore from '../helpers/data-stores'

describe("Mutations", function() {

  let state
  beforeEach(() => {
    state = {valuations:[], isLoading:false ,lastFetchedUpdateCoins:new Map()}
  })

  describe("#SET_LAST_FETCH_UPDATE_COINS", () => {
    it("stores date for new currency", () => {
      let date = new Date(0)
      let currency = "USD"
      SET_LAST_FETCH_UPDATE_COINS(state, {currency: currency, date: date})
      expect(state.lastFetchedUpdateCoins[currency]).to.equal(date)
    })
    it("updates date for currency", () => {
      state.lastFetchedUpdateCoins[currency] = Date(0)
      let date = new Date()
      let currency = "USD"
      SET_LAST_FETCH_UPDATE_COINS(state, {currency: currency, date: date})
      expect(state.lastFetchedUpdateCoins[currency]).to.equal(date)
    })
  })
})
