import {configureStore} from "@reduxjs/toolkit";
import filter from "./filterSlice/slice";
import cart from "./cartSlice/slice";
import items from "./itemSlice/slice";
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        items,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();