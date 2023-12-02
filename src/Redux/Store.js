import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './CartSlice'; // Adjust the path and case accordingly
import wishlistSlice from './WishlistSlice';

const store = configureStore({
  reducer: {
    wishlistReducer: wishlistSlice,
    cartReducer: cartSlice
  }
});

export default store;