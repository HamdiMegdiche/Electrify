import {
  LOADING_CONTRACT,
  GET_CONTRACT,
  CLEAR_ERRORS,
  GET_ERRORS,
  CLEAR_CONTRACT
} from "./types";
import getContract from "../utils/getContract";
import {setTransactionAction} from "./transactionsActions";

export const setContractAction = () => dispatch => {
  dispatch(setContractLoading());
  getContract
    .then(data => {
      const {web3,contract} = data;
      web3.eth.getAccounts().then(dataAccount => {
        const account = dataAccount[0];
        web3.eth.defaultAccount = account;
        contract.methods.transCount().call().then((nbrTransactions) => {
          dispatch(contractAction(data,parseInt(nbrTransactions._hex,16)));
          dispatch(setTransactionAction(data.contract, web3, account));
        });
      });
    })
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        });
      }
    });
};

const contractAction = (data,nbrTransactions) => {
  return {
    type: GET_CONTRACT,
    payload: {
      contract: data.contract,
      web3: data.web3,
      account: data.web3.eth.defaultAccount,
      nbrTransactions
    }
  };
};

// Set loading state
export const setContractLoading = () => {
  return {
    type: LOADING_CONTRACT
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const clearContract = () => {
  return {
    type: CLEAR_CONTRACT
  };
};
