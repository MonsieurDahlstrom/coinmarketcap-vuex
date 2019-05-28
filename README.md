# coinmarketcap-vuex
Small Vuex module for caching coin valuations in different currencies. This was build around the v1 api of coinmarketcap which has since been deprecated. Works as of May 28th 2018.

## Installation
```console
$ yarn add coinmarketcap-vuex
# OR
$ npm install coinmarketcap-vuex
```

## Configuration
```js
//Set up Vue & Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import CoinmarketcapModule from 'coinmarketcap-vuex'

Vue.use(Vuex)

//Create your vuex store
let store = new Vuex.Store({state: {}, modules: {coinmarketcap: module}})
```
## Use inside a .vue

```js
<template>
  <div>
    <form v-on:submit.prevent="onSubmit">
      <select v-model="selectedFiat">
        <option disabled>Select Currency</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <button>Refresh</button>
    </form>
    <ul>
      <li v-for="(crypto) in cryptoList" v-bind:key="crypto.crypto">
        <p>{{ crypto}}</p>
        <p>{{ latestRate(crypto,selectedFiat) }}</p>
        <p>{{ latestDate(crypto,selectedFiat) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
//helper methods to unpack the coinmarketcap module state and actions
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CoinList',
  data() {
    return { selectedFiat: 'none' };
  },
  computed: {
    //mapping out the isloading, in case disable form submission when requesting valuations
    ...mapState('coinmarketcap', { isLoading: state => state.isLoading }),
    //extract the unique crytocurrenct symbols available for a fiat currency
    cryptoList() {
      const cryptos = new Set();
      this.$store.getters['coinmarketcap/fiatValuations'](this.selectedFiat).forEach(valuation => cryptos.add(valuation.crypto));
      return cryptos;
    },
  },
  methods: {
    //mapping out  updateCoins action retrives latest valuations for specfic fiat currency
    ...mapActions('coinmarketcap', ['updateCoins']),
    //submit the form, retrives the largest 10 coins valuations in specfic fiat currency
    onSubmit() {
      this.updateCoins({ currency: this.selectedFiat, limit: 10 });
    },
    //for a trading pair find the latest valuation and return its date
    latestDate(crypto, fiat) {
      const valuations = this.$store.getters['coinmarketcap/tradingPairValuations'](crypto, fiat);
      const reducer = (max, current) => {
        const result = max.date.getTime() > current.date.getTime() ? max : current;
        return result;
      };
      const lastValuation = valuations.reduce(reducer, valuations[0]);
      return lastValuation.date;
    },
    //for a trading pair find the latest valuation and return its rate
    latestRate(crypto, fiat) {
      const valuations = this.$store.getters['coinmarketcap/tradingPairValuations'](crypto, fiat);
      const reducer = (max, current) => {
        const result = max.date.getTime() > current.date.getTime() ? max : current;
        return result;
      };
      const lastValuation = valuations.reduce(reducer, valuations[0]);
      return lastValuation.rate;
    },
  },
};
</script>
```

## Available Actions
```js
//specify fiat currency you want valuations for
//optionally specify a limit, which will cqp returned reults
//based on market capitalisation.
let payload =  {currency: this.selectedFiat, limit: 10 }
store.dispatch('coinmarketcap/updateCoins',payload);
```

## Available Getters
```js
//Specify a fiat currency and the date of last updated is returned
store.getters['coinmarketcap/crytocurrenciesUpdatedAt']('EUR')
```
```js
//returns all stored valuations for specific fiat currency
store.getters['coinmarketcap/fiatValuations']('EUR')
```
```js
//returns all stored valuations for specific crypto currency
store.getters['coinmarketcap/cryptocurrencyValuations']('ETH')
```
```js
//returns all stored valuations for a trading pair
store.getters['coinmarketcap/tradingPairValuations']('ETH','USD')
```

## Available state

```js
//boolean representing if an ongoing request is being made to
//coinmarketcap
store.coinmarketcap.state.isLoading
```
