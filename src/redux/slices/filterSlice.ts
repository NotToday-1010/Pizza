import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

type SortType = {
    name: string,
    sortQuery: string,
    order: string
}

interface FilterType {
    categoryID: number,
    sort: SortType,
    page: number,
}

const initialState: FilterType = {
    categoryID: 0,
    sort: {
        name: 'популярности',
        sortQuery: 'rating',
        order: 'desc'
    },
    page: 1,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, Id: PayloadAction<number>) {
            state.categoryID = Id.payload
        },
        setSort(state, properties: PayloadAction<SortType>) {
            state.sort.name = properties.payload.name
            state.sort.sortQuery = properties.payload.sortQuery
            state.sort.order = properties.payload.order
        },
        setPage(state, page: PayloadAction<number>) {
            state.page = page.payload
        },
        setUrlProps(state, properties: PayloadAction<FilterType>) {
            state.categoryID = properties.payload.categoryID
            state.sort = properties.payload.sort
            state.page = properties.payload.page
        }
    }
})

export const selectFilterPage = (state: RootState) => state.filter.page
export const selectFilterCategoryID = (state: RootState) => state.filter.categoryID
export const selectFilterSort = (state: RootState) => state.filter.sort

export default filterSlice.reducer
export const {setCategory, setSort, setPage, setUrlProps} = filterSlice.actions