import {GET_CONTRACT, LOADING_CONTRACT, CLEAR_CONTRACT} from "../actions/types";

const initialState = {
  contract: null,
  web3: null,
  account: null,
  loading: false,
  transactions: [],
  nbrTransactions:0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_CONTRACT:
      return {
        ...state,
        loading: true
      };
    case GET_CONTRACT:
      return {
        ...state,
        contract: action.payload.contract,
        web3: action.payload.web3,
        account: action.payload.account,
        nbrTransactions: action.payload.nbrTransactions,
        loading: false
      };
    case CLEAR_CONTRACT:
      return {};
    default:
      return state;
  }
}
