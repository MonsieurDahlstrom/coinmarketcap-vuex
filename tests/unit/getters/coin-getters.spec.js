import 'babel-polyfill'
//
import {expect} from 'chai'
//
import DataStore from '../helpers/data-stores'


describe("Getters", function() {

  let store,valuationsForUSD
  beforeEach(async function() {
    store = DataStore.StoreWithUSDValuations()
  })

  describe("helpers", () => {
    describe("#crytocurrenciesUpdatedAt", () => {
      it('exists', () => {
        expect(store.getters['coinmarketcap/crytocurrenciesUpdatedAt']).to.exist
      })
    })
  })

  describe("valuations", () => {
    describe("#fiatValuations", () => {
      it('exists', () => {
        expect(store.getters['coinmarketcap/fiatValuations']).to.exist
      })
      it('returns no results without cached results', () => {
        let result = store.getters['coinmarketcap/fiatValuations']("EUR")
        expect(result).to.be.an("array")
        expect(result.length).to.equal(0)
      })
      it('returns cached results', () => {
        let result = store.getters['coinmarketcap/fiatValuations']("USD")
        expect(result).to.be.an("array")
        expect(result.length).to.equal(store.state.coinmarketcap.valuations.length)
      })
    })
    describe("#cryptocurrencyValuations", () => {
      it('exists', () => {
        expect(store.getters['coinmarketcap/cryptocurrencyValuations']).to.exist
      })
      it('returns no results without cached results', () => {
        store.state.coinmarketcap.valuations = []
        let result = store.getters['coinmarketcap/cryptocurrencyValuations']("BTC")
        expect(result).to.be.an("array")
        expect(result.length).to.equal(0)
      })
      it('returns cached results', () => {
        let result = store.getters['coinmarketcap/cryptocurrencyValuations']("BTC")
        expect(result).to.be.an("array")
        expect(result.length).to.equal(1)
      })
    })
    describe("#cryptocurrencyLatestValuation", () => {
      it('exists', () => {
        expect(store.getters['coinmarketcap/cryptocurrencyLatestValuation']).to.exist
      })
      it('returns no results without cached results', () => {
        store.state.coinmarketcap.valuations = []
        let result = store.getters['coinmarketcap/cryptocurrencyLatestValuation']("BTC")
        expect(result).to.be.undefined
      })
      it('returns cached results', () => {
        let result = store.getters['coinmarketcap/cryptocurrencyLatestValuation']("BTC")
        expect(result).to.be.an("object")
        expect(result.crypto).to.equal("BTC")
      })
    })
    describe("#tradingPairValuations", () => {
      it('exists', () => {
        expect(store.getters['coinmarketcap/tradingPairValuations']).to.exist
      })
      it('returns no results without cached results', () => {
        store.state.coinmarketcap.valuations = []
        let result = store.getters['coinmarketcap/tradingPairValuations']()
        expect(result).to.be.an("array")
        expect(result.length).to.equal(0)
      })
      it('returns cached results', () => {
        let result = store.getters['coinmarketcap/tradingPairValuations']()
        expect(result).to.be.an("array")
        expect(result.length).to.equal(1)
      })
    })
  })
})

/**
  describe("#update", function() {
    let store, coinIndex
    beforeEach(async function() {
      coinIndex = await DataLoader.Bletchley10Index()
      store = DataLoader.StoreWithIndexes([coinIndex])
    })
    it('returns existing index', () => {
      let result = store.getters['bletchley/updateForIndexAndDate'](coinIndex.name, coinIndex.date)
      expect(result).to.be.an('object')
      expect(result).to.deep.equal(coinIndex)
    })
**/
