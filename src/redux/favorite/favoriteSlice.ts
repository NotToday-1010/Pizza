import {OnePizzaType, Status} from "../pizzas/pizzasTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAllPizzas} from "./asyncActions";
import {RootState} from "../store";


interface FavoriteStateType {
    favPizzas: OnePizzaType[],
    favoriteID: string[],
    status: Status
}


const initialState: FavoriteStateType = {
    favPizzas: [],
    favoriteID: [],
    status: Status.LOADING
}

const favoriteSlice = createSlice({
        name: 'favorite',
        initialState,
        reducers: {
            addManyFavorite(state, action: PayloadAction<string[]>) {
                state.favoriteID = [...state.favoriteID, ...action.payload]
            },
            addOneFavorite(state, action: PayloadAction<string>) {
                state.favoriteID.push(action.payload)
            },
            removeOneFavorite(state, action: PayloadAction<string>) {
                state.favoriteID = state.favoriteID.filter(id => id !== action.payload)
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllPizzas.pending, (state) => {
                    state.status = Status.LOADING
                    state.favPizzas = []
                })
                .addCase(fetchAllPizzas.fulfilled, (state, action: PayloadAction<OnePizzaType[]>) => {
                    if (action.payload.length !== 0) {
                        state.favPizzas = action.payload.filter((pizza) => state.favoriteID.includes(pizza.id))
                    }
                    state.status = Status.SUCCESS
                })
                .addCase(fetchAllPizzas.rejected, (state) => {
                    state.status = Status.ERROR
                    state.favPizzas = []
                })
        }
    }
)

export const selectFavPizzas = (state: RootState) => state.favorite.favPizzas
export const selectFavoriteID = (state: RootState) => state.favorite.favoriteID
export const selectFavoriteStatus = (state: RootState) => state.favorite.status

export default favoriteSlice.reducer
export const {addOneFavorite, removeOneFavorite, addManyFavorite} = favoriteSlice.actions