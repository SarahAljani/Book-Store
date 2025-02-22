import { legacy_createStore as createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import cartBooksReducer from "./reducers/cartBooksReducer";
import usersReducer from "./reducers/usersReducer";
import booksReducer from "./reducers/booksSlice"; // Import booksSlice
// Persist Configuration
const persistConfig = {
  key: "root", // Key for the storage
  storage, // Use localStorage
  whitelist: ["cart", "books"], // Persist books and cart
  blacklist: ["users"],
};

// Combine Reducers
const rootReducer = combineReducers({
  cart: cartBooksReducer,
  users: usersReducer,
  books: booksReducer, // Add books reducer
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
const store = createStore(persistedReducer);

// Create Persistor
const persistor = persistStore(store);

export { store, persistor };
