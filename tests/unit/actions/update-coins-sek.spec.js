import 'babel-polyfill'
import fetchMock from 'fetch-mock'
import {expect} from 'chai'
import * as coinmarketcap from 'coinmarketcap'

import * as Actions from "../../../src/actions"
import TickerSuccessRepsonse from '../data/coinmarketcap-ticker-response-sek.json'

import VuexActionTester from "../helpers/vuex-action-tester"
import ValidationHelpers from "../helpers/mutation-validations"

describe("#updateCoins SEK", function () {

  let options
  before(() => {
    options = {currency: "SEK"}
  })

  describe("coinmarketcap.com @e2e", function (done) {

    let liveData
    before( async () => {
      liveData = await coinmarketcap.ticker({convert: 'SEK'})
      fetchMock.mock('*', liveData)
    })
    after(() => {
      fetchMock.restore()
    })

    it("results parsed", function(done) {
      let getters = {crytocurrenciesUpdatedAt: () => new Date(0) }
      let mutations = new Array()
      mutations.push( ValidationHelpers.ToggleLoadingMutationGenerator() )
      for(let valuation of liveData) {
        mutations.push( ValidationHelpers.ValuationMutationGenerator(valuation.symbol,"SEK") )
      }
      mutations.push( ValidationHelpers.LastFetchedMutationGenerator("SEK") )
      mutations.push( ValidationHelpers.ToggleLoadingMutationGenerator() )
      var test = new VuexActionTester(Actions.updateCoins, options, getters, mutations, [], (err) => done(err))
      test.run()
    })
  })

  describe("http success", function () {
    beforeEach(function () {
      fetchMock.mock('*', TickerSuccessRepsonse)
    })
    afterEach(function () {
      fetchMock.restore()
    })
    it("results parsed", function(done) {
      let getters = {crytocurrenciesUpdatedAt: () => new Date(0) }
      let mutations = new Array()
      mutations.push( ValidationHelpers.ToggleLoadingMutationGenerator() )
      for(let valuation of TickerSuccessRepsonse) {
        mutations.push( ValidationHelpers.ValuationMutationGenerator(valuation.symbol,"SEK") )
      }
      mutations.push( ValidationHelpers.LastFetchedMutationGenerator("SEK") )
      mutations.push( ValidationHelpers.ToggleLoadingMutationGenerator() )
      var test = new VuexActionTester(Actions.updateCoins, options, getters, mutations, [], (err) => done(err))
      test.run()
    })
  })

  describe("http error", function () {

    beforeEach(function () {
      fetchMock.mock('*', {body: [] , status: 404})
    })
    afterEach(function () {
      fetchMock.restore()
    })

    it("within five minutes of last calll", function (done) {
      let getters = {crytocurrenciesUpdatedAt: () => new Date() }
      var test = new VuexActionTester(Actions.updateCoins, options, getters, [], [], (err) => done(err))
      test.run()
    })
    it("beyond five minutes of last call", function(done) {
      let getters = {crytocurrenciesUpdatedAt: () => new Date(0) }
      let mutations = [ValidationHelpers.ToggleLoadingMutationGenerator(), ValidationHelpers.ToggleLoadingMutationGenerator()]
      var test = new VuexActionTester(Actions.updateCoins, options, getters, mutations, [], (err) => done(err))
      test.run()
    })

  })

  describe("network unavailable", function () {

    beforeEach(function () {
      fetchMock.mock("*", { throws: { message: 'network error' } })
    })
    afterEach(function () {
      fetchMock.restore()
    })

    it("within five minutes of last call", function (done) {
      let getters = {crytocurrenciesUpdatedAt: () => new Date() }
      var test = new VuexActionTester(Actions.updateCoins, options, getters, [], [], (err) => done(err))
      test.run()
    })
    it("beyond five minutes of last call", function(done) {
      let getters = {crytocurrenciesUpdatedAt: () => new Date(0) }
      let mutations = [ValidationHelpers.ToggleLoadingMutationGenerator(), ValidationHelpers.ToggleLoadingMutationGenerator()]
      var test = new VuexActionTester(Actions.updateCoins, options, getters, mutations, [], (err) => done(err))
      test.run()
    })

  })

})
