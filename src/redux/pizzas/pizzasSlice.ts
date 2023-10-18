import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {OnePizzaType, PizzaSliceState, Status} from "./pizzasTypes";
import {fetchOnePizza, fetchPizzas} from "./asyncActions";


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