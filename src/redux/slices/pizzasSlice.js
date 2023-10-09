import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'requests/fetchPizzas',
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

export const fetchOnePizza = createAsyncThunk(
    'requests/fetchOnePizza',
    async (id) => {
        const {data} = await axios.get(`https://64bfe9220d8e251fd111ac24.mockapi.io/items/${id}`)
        return data
    }
)

const initialState = {
    allPizzas: [],
    onePizza: {},
    status: 'loading', //loading, success, error
    fetchOneStatus: 'loading' //loading, success, error
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
            // Для инфы о пицце
            .addCase(fetchOnePizza.pending, (state) => {
                state.fetchOneStatus = 'loading'
                state.onePizza = {}
            })
            .addCase(fetchOnePizza.fulfilled, (state, action) => {
                state.fetchOneStatus = 'success'
                state.onePizza = action.payload
            })
            .addCase(fetchOnePizza.rejected, (state) => {
                state.fetchOneStatus = 'error'
                state.status = 'error'
                state.onePizza = []
            })

            // Получение всех пицц
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
        // .addMatcher(customCondition, (state) => {do something})
        // .addDefaultCase((state) => {do something if no case and matcher is not worked})  //like finally
    }
})

export const selectPizza = (state) => state.pizza.allPizzas
export const selectPizzaStatus = (state) => state.pizza.status
export const selectOnePizzaStatus = (state) => state.pizza.fetchOneStatus
export const selectOnePizza = (state) => state.pizza.onePizza

export default pizzasSlice.reducer