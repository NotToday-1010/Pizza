import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from '../store'
import {ActionCartItemType, CartItem, CartSliceState} from "./cartTypes";


const initialState: CartSliceState = {
    totalPrice: 0,
    pizzas: [],
    eachPizzaCount: {},
    totalCount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        setCartState: (state, action: PayloadAction<CartSliceState>) => {
            state.totalPrice = Number(action.payload.totalPrice)
            state.pizzas = action.payload.pizzas
            state.eachPizzaCount = action.payload.eachPizzaCount
            state.totalCount = Number(action.payload.totalCount)
        },
        addPizza(state, pizza: PayloadAction<CartItem>) {
            let flag = 0
            let isMutated = 0
            state.totalPrice = state.totalPrice + pizza.payload.price
            state.totalCount = state.totalCount + 1
            for (let pizzaId in state.eachPizzaCount) {
                if (pizza.payload.id === pizzaId) {
                    flag = 1
                }
            }
            if (!flag) {
                state.eachPizzaCount[pizza.payload.id] = 1
                state.pizzas = [...state.pizzas, pizza.payload]
                isMutated = 1
            }

            if (flag) {
                state.eachPizzaCount[pizza.payload.id] = state.eachPizzaCount[pizza.payload.id] + 1
                state.pizzas.every((obj1, ind) => {
                        if ((obj1.id === pizza.payload.id) && (obj1.type === pizza.payload.type) && (obj1.size === pizza.payload.size)) {
                            state.pizzas[ind].count = state.pizzas[ind].count + 1
                            isMutated = 1
                            return false
                        }
                        return true
                    }
                )
                if (!isMutated) state.pizzas = [...state.pizzas, pizza.payload]

            }
        },
        removePizza(state, action: PayloadAction<ActionCartItemType>) {
            state.eachPizzaCount[action.payload.id] = state.eachPizzaCount[action.payload.id] - action.payload.count
            state.pizzas = state.pizzas.filter(obj => (obj.id !== action.payload.id) || (obj.type !== action.payload.type) || (obj.size !== action.payload.size))
            state.totalCount = state.totalCount - action.payload.count
            state.totalPrice = state.totalPrice - action.payload.price * action.payload.count
        },
        clearCart(state) {
            state.totalPrice = 0
            state.pizzas = []
            state.eachPizzaCount = {}
            state.totalCount = 0
        },
        addOneExistingPizza(state, action: PayloadAction<ActionCartItemType>) {
            state.pizzas.every((obj: CartItem, ind: number) => {
                    if ((obj.id === action.payload.id) && (obj.type === action.payload.type) && (obj.size === action.payload.size)) {
                        state.pizzas[ind].count = state.pizzas[ind].count + 1
                        state.eachPizzaCount[obj.id] = state.eachPizzaCount[obj.id] + 1
                        return false
                    }
                    return true
                }
            )
            state.totalCount = state.totalCount + 1
            state.totalPrice = state.totalPrice + action.payload.price
        },
        removeOneExistingPizza(state, action: PayloadAction<ActionCartItemType>) {
            state.pizzas.every((obj, ind) => {
                    if ((obj.id === action.payload.id) && (obj.type === action.payload.type) && (obj.size === action.payload.size)) {
                        state.pizzas[ind].count = state.pizzas[ind].count - 1
                        state.eachPizzaCount[obj.id] = state.eachPizzaCount[obj.id] - 1
                        return false
                    }
                    return true
                }
            )
            state.totalCount = state.totalCount - 1
            state.totalPrice = state.totalPrice - action.payload.price
            if (state.totalCount === 0) {
                state.pizzas = []
                state.eachPizzaCount = {}
            }
        }
    }
})

export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice
export const selectCartTotalCount = (state: RootState) => state.cart.totalCount
export const selectCartPizzas = (state: RootState) => state.cart.pizzas
export const selectCartEachPizzaCount = (state: RootState) => state.cart.eachPizzaCount
export const selectCartState = (state: RootState) => state.cart

export default cartSlice.reducer
export const {
    setCartState,
    addPizza,
    clearCart,
    removePizza,
    addOneExistingPizza,
    removeOneExistingPizza
} = cartSlice.actions