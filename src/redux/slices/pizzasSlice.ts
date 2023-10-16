import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

type OnePizzaType = {
    "id": string,
    "imageUrl": string,
    "title": string,
    "types": number[],
    "sizes": number[],
    "price": number,
    "category": number,
    "rating": number,
    "compound": string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    allPizzas: OnePizzaType[],
    onePizza: OnePizzaType,
    status: Status
    fetchOneStatus: Status
}

interface FetchParams {
    page: number,
    selectedSort: {
        name: string,
        sortQuery: string,
        order: string
    },
    searchValue: string,
    categoryID: number
}

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

const initialState: PizzaSliceState = {
    allPizzas: [],
    onePizza: {
        id: "",
        imageUrl: "",
        title: "",
        types: [],
        sizes: [],
        price: 0,
        category: 0,
        rating: 0,
        compound: ""
    },
    status: Status.LOADING, //loading, success, error
    fetchOneStatus: Status.LOADING //loading, success, error
}

export const pizzasSlice = createSlice({
    name: 'responses',
    initialState,
    reducers: {
        // setPizzas(state, action) {
        //     state.allPizzas = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            // Для информации о пицце
            .addCase(fetchOnePizza.pending, (state) => {
                state.fetchOneStatus = Status.LOADING
                state.onePizza = {} as OnePizzaType
            })
            .addCase(fetchOnePizza.fulfilled, (state, action: PayloadAction<OnePizzaType>) => {
                state.fetchOneStatus = Status.SUCCESS
                state.onePizza = action.payload
            })
            .addCase(fetchOnePizza.rejected, (state) => {
                state.fetchOneStatus = Status.ERROR
                state.status = Status.ERROR
                state.onePizza = {} as OnePizzaType
            })

            // Получение всех пицц
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.allPizzas = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<OnePizzaType[]>) => {
                state.status = Status.SUCCESS
                state.allPizzas = action.payload
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.allPizzas = []
            })
        // .addMatcher(customCondition, (state) => {do something})
        // .addDefaultCase((state) => {do something if no case and matcher is not worked})  //like finally
    }
})

export const selectPizza = (state: RootState) => state.pizza.allPizzas
export const selectPizzaStatus = (state: RootState) => state.pizza.status
export const selectOnePizzaStatus = (state: RootState) => state.pizza.fetchOneStatus
export const selectOnePizza = (state: RootState) => state.pizza.onePizza

export default pizzasSlice.reducer