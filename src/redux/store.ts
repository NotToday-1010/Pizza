import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./search/searchSlice";
import filterSlice from "./filter/filterSlice";
import cartSlice from "./cart/cartSlice";
import pizzasSlice from "./pizzas/pizzasSlice";
import {useDispatch} from "react-redux";


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        search: searchReducer,
        filter: filterSlice,
        pizza: pizzasSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()