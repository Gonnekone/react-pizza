import {configureStore} from "@reduxjs/toolkit";
import filter from "./filterSlice/slice";

export const store = configureStore({
    reducer: {
        filter
    }
});