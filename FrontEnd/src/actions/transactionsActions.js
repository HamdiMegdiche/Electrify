import {
  SET_TRANSACTION,
  SET_TRANSACTIONS,
  TRANS_LOADING
} from "./types";

import { confirmTransaction } from "../actions/offerActions";

export const setTransactionAction = (contract,web3,account) => dispatch => {
  
  const messageEvent = contract.events.message();

  messageEvent.on("data", event => {    

   const trans = {
     from: event.returnValues[0],
     to: event.returnValues[1],
     unitPrice: web3.utils.fromWei(parseInt(event.returnValues[2]._hex, 16).toString(),"ether"),
     quantity: parseInt(event.returnValues[3]._hex, 16) / 1000,
     offerId: event.returnValues[5],
     date:event.returnValues[4] * 1000
    };

    dispatch(transactionAction(trans,account));
    confirmTransaction(trans.offerId, dispatch);

 })
 .on("error", console.error);

};
  




const transactionAction = (transaction, account) => {
  const data = {
    transaction,
    account
  }
    return {
      type: SET_TRANSACTION,
        payload: data,
    }
}
  
const transactionsAction = (transactions, account) => {
  const data = {
    transactions,
    account
  }
  return {
    type: SET_TRANSACTIONS,
      payload: data,
  }
}

export const setTransLoading = () => {
  return {
    type: TRANS_LOADING
  };
};


export const getTransactions = (contract,web3,account) => dispatch => {


  const transactions = [];
  dispatch(setTransLoading());
  contract.methods.transCount().call().then( async (nbrTrans) => {

    for (let i = 0; i < nbrTrans; i++) {
      const tr = await contract.methods.transactions(i).call()
  
      const trans = {
        from: tr[0],
        to: tr[1],
        unitPrice: web3.utils.fromWei(tr[2].toString(),"ether"),
        quantity: tr[3] / 1000,
        date: tr[4]*1000
      };
      transactions.push(trans);
    }

    dispatch(transactionsAction(transactions,account));
  }
  );
}

