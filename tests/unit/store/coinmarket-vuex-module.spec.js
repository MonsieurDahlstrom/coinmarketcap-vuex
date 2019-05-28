import 'babel-polyfill'
//
import chaiDateTime from 'chai-datetime'
import chai, {expect} from 'chai'
chai.use(chaiDateTime)

import Vue from 'vue'
import Vuex from 'vuex'

//
import module from '../../../src'

Vue.use(Vuex)

describe("CoinmarketVuexModule", function() {
  describe("Module Properties", function() {
    describe("state", function() {
      it("is exported", () => expect(module.state).to.exist )
      it("has valuations", () => expect(module.state.valuations).to.exist )
      it("has loading", () => expect(module.state.isLoading).to.exist )
      it("has lastupdated", () => expect(module.state.lastFetchedUpdateCoins).to.exist )
    })
    it("has getters", () => expect(module.getters).to.exist )
    it("has actions", () => expect(module.actions).to.exist )
    it("has mutations", () => expect(module.mutations).to.exist )
    it("registers with store", () => expect( () => { new Vuex.Store({state: {}, modules: {coinmarketcap: module}}) } ).to.not.throw())
  })

  describe("live @e2e", function () {
    it("loads valuations", async () => {
      let store = new Vuex.Store({state: {}, modules: {coinmarketcap: module}})
      await store.dispatch("coinmarketcap/updateCoins", {currency: "USD"} )
      let valuations = store.getters['coinmarketcap/fiatValuations']()
      expect(valuations).to.be.an("array")
      expect(valuations.length).to.be.above(0)
    })
  })
})
