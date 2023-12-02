import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            const indexToRemove = state.findIndex(item => item.id === action.payload);
            if (indexToRemove !== -1) {
                state.splice(indexToRemove, 1);
            }
        },
        emptyCart: (state) => {
            return state = [];
        }
    }
});

export const { addToCart, removeFromCart, emptyCart } = CartSlice.actions;
export default CartSlice.reducer;