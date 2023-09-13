import {createSlice} from "@reduxjs/toolkit";

const initialState = {
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
        setCategory(state, Id) {
            state.categoryID = Id.payload
        },
        setSort(state, properties) {
            state.sort.name = properties.payload.name
            state.sort.sortQuery = properties.payload.sortQuery
            state.sort.order = properties.payload.order
        },
        setPage(state, page) {
            state.page = page.payload
        },
        setUrlProps(state, properties) {
            state.categoryID = properties.payload.id
            state.sort.name = properties.payload.name
            state.sort.sortQuery = properties.payload.sortQuery
            state.sort.order = properties.payload.order
            state.page = properties.payload.page
        }
    }
})

export default filterSlice.reducer
export const {setCategory, setSort, setPage, setUrlProps} = filterSlice.actions