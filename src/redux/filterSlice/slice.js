import {createSlice} from '@reduxjs/toolkit'

export const selectFilter = (state) => state.filter

const initialState = {
    categoryId: 0,
    searchValue: "",
    pageNumber: 1,
    sortId: 0,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setSortId: (state, action) => {
            state.sortId = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload
        },
        setFilters: (state, action) => {
            state.categoryId = Number(action.payload.categoryId)
            state.sortId = Number(action.payload.sortId)
            state.pageNumber = Number(action.payload.pageNumber)
        }
    },
})

export const {setCategoryId, setSortId, setSearchValue, setPageNumber, setFilters} = filterSlice.actions

export default filterSlice.reducer