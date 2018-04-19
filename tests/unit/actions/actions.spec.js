import 'babel-polyfill'

import {expect} from 'chai'
var fetchMock = require('fetch-mock');

import VuexActionTester from "../helpers/vuex-action-tester"
import * as Actions from "../../../src/actions"
import * as MutationTypes from '../../../src/mutation-types'
import TickerSuccessRepsonse from '../data/coinmarketcap-ticker-response.json'

describe("Actions", function() {
  describe.only("#updateCoins", function() {

    describe("coinmarketcap.com available", function () {
      beforeEach(function () {
        fetchMock.mock('*', TickerSuccessRepsonse)
      })
      afterEach(function () {
        fetchMock.restore()
      })
      describe("within 5 minutes of last call", function () {
        let getters
        beforeEach(function() {
          getters = {allCoinsUpdated: () => new Date() }
        })
        it("no conversion", function (done) {
          let options = {}
          var test = new VuexActionTester(Actions.updateCoins, options, getters, [], [], done)
          test.run()
        })
        it("EUR conversion", function (done) {
          let options = {currency:"EUR"}
          var test = new VuexActionTester(Actions.updateCoins, options, getters, [], [], done)
          test.run()
        })
      })
      describe("beyond five minutes of last call", function() {
        let getters
        beforeEach(function() {
          getters = {allCoinsUpdated: () => new Date(0) }
        })
        it("no conversion", function(done) {
          let options = {}
          let getters = {allCoinsUpdated: () => new Date(0) }
          let mutations = [
            {
              type: MutationTypes.TOGGLE_LOADING,
              validation: function () {}
            },
            {
              type: MutationTypes.ADD_CURRENCY_VALUATION,
              validation: function () {}
            },
            {
              type: MutationTypes.ADD_CURRENCY_VALUATION,
              validation: function () {}
            },
            {
              type: MutationTypes.SET_LAST_FETCH_UPDATE_COINS,
              validation:  (payload) => expect(payload.currency).to.equal("USD")
            },
            {
              type: MutationTypes.TOGGLE_LOADING,
              validation: function () {}
            }
          ]
          var test = new VuexActionTester(Actions.updateCoins, options, getters, mutations, [], done)
          test.run()
        })
        it("EUR conversion", function(done) {
          let options = {currency: "EUR"}
          let getters = {allCoinsUpdated: () => new Date(0) }
          let mutations = [
            {
              type: MutationTypes.TOGGLE_LOADING,
              validation: function () {}
            },
            {
              type: MutationTypes.ADD_CURRENCY_VALUATION,
              validation: function () {}
            },
            {
              type: MutationTypes.ADD_CURRENCY_VALUATION,
              validation: function () {}
            },
            {
              type: MutationTypes.SET_LAST_FETCH_UPDATE_COINS,
              validation:  (payload) => expect(payload.currency).to.equal("EUR")
            },
            {
              type: MutationTypes.TOGGLE_LOADING,
              validation: function () {}
            }
          ]
          var test = new VuexActionTester(Actions.updateCoins, options, getters, mutations, [], done)
          test.run()
        })
      })
    })
    
    describe("coinmarketcap.com unavailable", function () {
      beforeEach(function () {
        fetchMock.mock('*', {body: [] , status: 404})
      })
      afterEach(function () {
        fetchMock.restore()
      })
      it("within five minutes of last calll", function (done) {
        let options = {}
        let getters = {allCoinsUpdated: () => new Date() }
        var test = new VuexActionTester(Actions.updateCoins, options, getters, [], [], done)
        test.run()
      })
      it("beyond five minutes of last call", function(done) {
        let options = {}
        let getters = {allCoinsUpdated: () => new Date(0) }
        let mutations = [
          {
            type: MutationTypes.TOGGLE_LOADING,
            validation: function () {}
          },
          {
            type: MutationTypes.TOGGLE_LOADING,
            validation: function () {}
          }
        ]
        var test = new VuexActionTester(Actions.updateCoins, options, getters, mutations, [], done)
        test.run()
      })
    })
  })
})
