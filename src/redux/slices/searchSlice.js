import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchQuery: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        edit: (state, newSearch) => {
            state.searchQuery = newSearch.payload
        },
        clear: (state) => {
            state.searchQuery = ''
        },
    },
})

export const {edit, clear} = searchSlice.actions
export default searchSlice.reducer