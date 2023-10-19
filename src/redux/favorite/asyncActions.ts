import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {OnePizzaType} from "../pizzas/pizzasTypes";

export const fetchAllPizzas = createAsyncThunk(
    'requests/fetchAllPizzas',
    async () => {
        const {data} = await axios.get<OnePizzaType[]>(`https://64bfe9220d8e251fd111ac24.mockapi.io/items`)
        return data
    }
)