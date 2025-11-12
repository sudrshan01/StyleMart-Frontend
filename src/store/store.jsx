// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsStore";
import reviewsReducer from "./reviewStore";
import addressReducer from "./addressSlice"
const store = configureStore({
  reducer: {
    products: productsReducer,
    reviews: reviewsReducer,
    address: addressReducer,
  },
});

export default store;
