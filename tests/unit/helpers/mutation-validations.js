import {expect} from 'chai'

import * as MutationTypes from '../../../src/mutation-types'

const validations = {
  ToggleLoadingMutationGenerator() {
    return {
      type: MutationTypes.TOGGLE_LOADING,
      validation: payload => {
        expect(payload).to.be.an("object")
      }
    }
  },
  ValuationMutationGenerator(crypto, currency) {
    return {
      type: MutationTypes.ADD_CURRENCY_VALUATION,
      validation: function (payload) {
        expect(payload).to.have.property("crypto")
        expect(payload).to.have.property("fiat")
        expect(payload).to.have.property("rate")
        expect(payload).to.have.property("date")
        expect(payload).to.have.property("info")
      }
    }
  },
  LastFetchedMutationGenerator(currency) {
    return {
      type: MutationTypes.SET_LAST_FETCH_UPDATE_COINS,
      validation:  (payload) => expect(payload.currency).to.equal(currency),
    }
  }
}

export default validations
