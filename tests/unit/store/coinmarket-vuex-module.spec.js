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
    it("has state", () => expect(module.state).to.exist )
    it("has getters", () => expect(module.getters).to.exist )
    it("has actions", () => expect(module.actions).to.exist )
    it("has mutations", () => expect(module.mutations).to.exist )
    it("registers with store", () => expect( () => { new Vuex.Store({state: {}, modules: {coinmarketcap: module}}) } ).to.not.throw())
  })
  describe("namespaced getters", function () {
    let store = new Vuex.Store({state: {}, modules: {coinmarketcap: module}})
    it('has last updated', () => expect(store.getters['coinmarketcap/updatedAt']()).to.equalTime( new Date(0)) )
    it('has valuations', () => expect(store.getters['coinmarketcap/valuationsForFiat']()).to.be.an('array') )
    it('has valuations', () => expect(store.getters['coinmarketcap/valuationsForTradingPair']()).to.be.an('array') )

    it('has loading', () => expect(store.getters['coinmarketcap/loading']()).to.be.false )
  })
})