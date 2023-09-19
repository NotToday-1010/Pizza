import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        search: searchReducer,
        filter: filterSlice,
        pizza: pizzasSlice
    },
})