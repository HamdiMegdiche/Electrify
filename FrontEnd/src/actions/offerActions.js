import axios from "../api";
import {
  ADD_OFFER,
  GET_OFFERS,
  GET_OFFER,
  DELETE_OFFER,
  OFFER_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_MY_OFFERS,
  DELETE_ALL_OFFERS,
  BUY_OFFER,
  SEARCH_OFFER,
} from "../actions/types";

export const addOffer = offerData => dispatch => {
  dispatch(clearErrors());
  axios.post("/offers/create", offerData)
    .then(res =>
      dispatch({
        type: ADD_OFFER,
        payload: res.data
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};

// Get Posts
export const buyOffer = (contract,offer,user) => dispatch => {
  const ether = 1000000000000000000;
  if (contract) {
        contract.methods
        .makeTransaction(offer.from, offer.quantity,offer._id)
        .send({
          value: (offer.quantity / 1000) * offer.unitPrice * ether
        })
      }
};



export const confirmTransaction = (id,dispatch) => {
  axios
    .post(`offers/confirm/${id}`)
  .then(res => {
    dispatch({
      type: BUY_OFFER,
      payload: res.data
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
      })
    }
  })
}

export const getOffers = () => dispatch => {
  dispatch(setOfferLoading());
  axios
    .get("/offers")
    .then(res => {
      dispatch({
        type: GET_OFFERS,
        payload: res.data
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
        })
      }
    })
};

// Get Posts
export const getMyOffers = (walletAddress) => dispatch => {
  dispatch(setOfferLoading());
  axios
    .get(`offers/from/${walletAddress}`)
    .then(res => {
      dispatch({
        type: GET_MY_OFFERS,
        payload: res.data
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
        })
      }
    })
};


export const getOffer = id => dispatch => {
  dispatch(setOfferLoading());
  axios
    .get(`/offers/${id}`)
    .then(res =>
      dispatch({
        type: GET_OFFER,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const deleteOffer = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/offers/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_OFFER,
        payload: id
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};


export const deleteAllOffers = body => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/offers/delete/${body.walletAddress}`,)
    .then(res =>
      dispatch({
        type: DELETE_ALL_OFFERS,
        payload: res.data
      })
    )
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};



export const searchOffers = (min, max) => dispatch => {
  const body = { min, max };
  axios
  .post('/offers/search/',body)
  .then(res =>
    dispatch({
      type: SEARCH_OFFER,
      payload: res.data
    })
  )
  .catch(error => {
    if (error.response && error.response.data) {
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: error.response.data,
          visible: true
        }
      })
    }
  })
}

// Set loading state
export const setOfferLoading = () => {
  return {
    type: OFFER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
