import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        search: searchReducer,
        filter: filterSlice
    },
})