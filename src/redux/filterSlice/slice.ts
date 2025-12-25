import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {FilterSliceState} from "./types";

export const selectFilter = (state: RootState) => state.filter

const initialState: FilterSliceState = {
    categoryId: 0,
    searchValue: "",
    pageNumber: 1,
    sortId: 0,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortId: (state, action: PayloadAction<number>) => {
            state.sortId = action.payload
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.categoryId = Number(action.payload.categoryId)
            state.sortId = Number(action.payload.sortId)
            state.pageNumber = Number(action.payload.pageNumber)
        }
    },
})

export const {setCategoryId, setSortId, setSearchValue, setPageNumber, setFilters} = filterSlice.actions

export default filterSlice.reducer