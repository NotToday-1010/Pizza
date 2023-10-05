import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'responses/fetchPizzas',
    async (params) => {
        const {
            page,
            selectedSort,
            searchValue,
            categoryID
        } = {...params}
        const {data} = await axios.get(`https://64bfe9220d8e251fd111ac24.mockapi.io/items?page=${page}&limit=4&${categoryID !== 0 ? `category=${categoryID}` : ''}&sortBy=${selectedSort.sortQuery}&order=${selectedSort.order}&search=${searchValue}`)
        return data;
    }
)

const initialState = {
    allPizzas: [],
    status: 'loading' //loading, success, error
}

export const pizzasSlice = createSlice({
    name: 'responses',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.allPizzas = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading'
                state.allPizzas = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = 'success'
                state.allPizzas = action.payload
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error'
                state.allPizzas = []
            })
    }
})

export const selectPizza = (state) => state.pizza.allPizzas
export const selectPizzaStatus = (state) => state.pizza.status

export default pizzasSlice.reducer