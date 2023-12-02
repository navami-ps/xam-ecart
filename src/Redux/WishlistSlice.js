import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
    name: "Wishlist",
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            state.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            const indexToRemove = state.findIndex(item => item.id === action.payload);
            if (indexToRemove !== -1) {
                state.splice(indexToRemove, 1);
            }
        }
    }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;