import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {FetchItemsArgs} from "./types";

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async ({pageNumber, categoryId, searchValue, sort}: FetchItemsArgs) => {
        const {data} = await axios.get<Item[]>(`https://6937f1194618a71d77ce4027.mockapi.io/items?` +
            `page=${pageNumber}&limit=4&sortBy=${sort}` +
            `${categoryId === 0 ? "" : `&category=${categoryId}`}` +
            `${searchValue === "" ? "" : `&search=${searchValue}`}`)

        return data
    },
)

export const selectItems = (state: RootState) => state.items

export type Item = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
};

export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}
export interface ItemSliceState {
    items: Item[];
    status: Status;
}

const initialState: ItemSliceState = {
    items: [],
    status: Status.LOADING,
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
})

export default itemsSlice.reducer