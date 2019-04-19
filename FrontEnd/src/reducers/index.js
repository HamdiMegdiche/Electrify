import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import offerReducer from "./offerReducer";
import weatherListReducer from './weatherList';
import citiesReducer from './cities';
import contractReducer from './contractReducer';
import transactionsReducer from './transactionsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  offer: offerReducer,
  weatherList: weatherListReducer,
  cities: citiesReducer,
  contract: contractReducer,
  trans:transactionsReducer
});
