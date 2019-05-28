import 'babel-polyfill'
//
import {expect} from 'chai'
//
import Mutations from '../../../src/mutations'
const { ADD_CURRENCY_VALUATION, REMOVE_CURRENCY_VALUATION } = Mutations
//
import DataStore from '../helpers/data-stores'

describe("Mutations", function() {

  let state
  beforeEach(() => {
    state = {valuations:[], isLoading:false ,lastFetchedUpdateCoins:{}}
  })

  describe("#ADD_CURRENCY_VALUATION", () => {
    it("add new valuation", () => {
      let valuation = DataStore.valuationForUSD()
      // apply mutation
      ADD_CURRENCY_VALUATION(state, valuation)
      // assert result
      expect(state.valuations.length).to.equal(1)
      expect(state.valuations[0]).to.deep.equal(valuation)
    })
    it("does not duplicate", () => {
      let storedValuation = DataStore.valuationForUSD()
      let newValuation = DataStore.valuationForUSD()
      state.valuations.push(storedValuation)
      // apply mutation
      ADD_CURRENCY_VALUATION(state, newValuation)
      // assert result
      expect(state.valuations.length).to.equal(1)
      expect(state.valuations[0]).to.equal(storedValuation)
    })
  })

  describe("#REMOVE_CURRENCY_VALUATION", () => {
    it("remove valuation", () => {
      let valuation = DataStore.valuationForUSD()
      state.valuations.push(valuation)
      // apply mutation
      REMOVE_CURRENCY_VALUATION(state, valuation)
      // assert result
      expect(state.valuations.length).to.equal(0)
    })
    it("removes only specifed valuation", () => {
      let storedValuation = DataStore.valuationForUSD()
      let newValuation = DataStore.valuationForUSD()
      newValuation.date = new Date(0);
      state.valuations.push(storedValuation)
      // apply mutation
      REMOVE_CURRENCY_VALUATION(state, newValuation)
      // assert result
      expect(state.valuations.length).to.equal(1)
      expect(state.valuations[0]).to.equal(storedValuation)
    })
  })

})
