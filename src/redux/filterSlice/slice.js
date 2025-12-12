import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
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
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload
        }
    },
})

export const {setCategoryId, setSortId, setPageNumber} = filterSlice.actions

export default filterSlice.reducer