import {
  ADD_OFFER,
  GET_OFFERS,
  GET_OFFER,
  DELETE_OFFER,
  OFFER_LOADING,
  GET_MY_OFFERS,
  DELETE_ALL_OFFERS,
  BUY_OFFER,
  SEARCH_OFFER,
} from "../actions/types";

const initialState = {
  offers: [],
  offer: {},
  myOffers:[],
  loading: false,
  search: [],
  searching :false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OFFER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        loading: false
      };
    case GET_MY_OFFERS:
      return {
        ...state,
        myOffers: action.payload,
        loading: false
      };
    case GET_OFFER:
      return {
        ...state,
        offer: action.payload,
        loading: false
      };
    case ADD_OFFER:
      return {
        ...state,
        offer: action.payload
      };
    case DELETE_OFFER:
      return {
        ...state,
        offers: state.offers.filter(offer => offer._id !== action.payload)
      };
    case DELETE_ALL_OFFERS:
      return {
        ...state,
        myOffers: []
      };
    case BUY_OFFER: 
      return {
        ...state,
        offers: state.offers.map(offer => (offer._id === action.payload._id) ? offer = action.payload : offer),
        myOffers: state.myOffers.map(offer => (offer._id === action.payload._id) ? offer = action.payload : offer)
      };
    case SEARCH_OFFER: 
    return {
      ...state,
      search: action.payload.offers,
      searching: action.payload.searching
    };
    default:
      return state;
  }
}

