import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async ({pageNumber, categoryId, searchValue, sort}) => {
        const {data} = await axios.get(`https://6937f1194618a71d77ce4027.mockapi.io/items?` +
            `page=${pageNumber}&limit=4&sortBy=${sort}` +
            `${categoryId === 0 ? "" : `&category=${categoryId}`}` +
            `${searchValue === "" ? "" : `&search=${searchValue}`}`)

        return data
    },
)

export const selectItems = (state) => state.items
export const selectCartItemById = (id, type, size) => (state) =>
    state.cart.items.find(item => item.id === id
        && item.type === type && item.size === size)

const initialState = {
    items: [],
    status: "loading",
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = "loading";
            state.items = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = "error";
            state.items = [];
        });
    },
})

export default itemsSlice.reducer