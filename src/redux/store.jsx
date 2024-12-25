// store.js
import { legacy_createStore as createStore, combineReducers } from "redux";
import cartBooksReducer from "./reducers/cartBooksReducer";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
  cart: cartBooksReducer,
  users:usersReducer,
  // other reducers
});

const store = createStore(rootReducer);

export default store;
