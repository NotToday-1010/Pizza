import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchParams, OnePizzaType} from "./pizzasTypes";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<OnePizzaType[], FetchParams>(
    'requests/fetchPizzas',
    async (params) => {
        const {
            page,
            selectedSort,
            searchValue,
            categoryID
        } = {...params}
        const {data} = await axios.get<OnePizzaType[]>(`https://64bfe9220d8e251fd111ac24.mockapi.io/items?page=${page}&limit=4&${categoryID !== 0 ? `category=${categoryID}` : ''}&sortBy=${selectedSort.sortQuery}&order=${selectedSort.order}&search=${searchValue}`)
        return data
    }
)

export const fetchOnePizza = createAsyncThunk<OnePizzaType, string>(
    'requests/fetchOnePizza',
    async (id) => {
        const {data} = await axios.get<OnePizzaType>(`https://64bfe9220d8e251fd111ac24.mockapi.io/items/${id}`)
        return data
    }
)