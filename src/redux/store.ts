import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";
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