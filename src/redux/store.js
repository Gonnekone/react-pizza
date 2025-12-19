import {configureStore} from "@reduxjs/toolkit";
import filter from "./filterSlice/slice";
import cart from "./cartSlice/slice";
import items from "./itemSlice/slice";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        items,
    }
});