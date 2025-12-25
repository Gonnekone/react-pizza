import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {CartItem, CartSliceState} from "./types";

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string, type: number, size: number) => (state: RootState) =>
    state.cart.items.find(item => item.id === id
        && item.type === type && item.size === size)

const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const find = state.items.find((item) => item.id === action.payload.id
                && item.type === action.payload.type && item.size === action.payload.size);

            if (find) {
                find.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }

            state.totalPrice += action.payload.price
        },
        removeOneItem: (state, action: PayloadAction<CartItem>) => {
            const find = state.items.find((item) => item.id === action.payload.id
                && item.type === action.payload.type && item.size === action.payload.size);

            if (!find) {
                return
            }

            if (find.count > 1) {
                find.count--
                state.totalPrice -= action.payload.price
            } else if (find) {
                state.items = state.items.filter(item => item.id !== action.payload.id
                    || item.type !== action.payload.type || item.size !== action.payload.size)

                state.totalPrice -= action.payload.price
            }
        },
        removeItem: (state, action: PayloadAction<CartItem>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id
                || item.type !== action.payload.type || item.size !== action.payload.size)

            state.totalPrice -= action.payload.price*action.payload.count
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        }
    },
})

export const {addItem, removeItem, clearItems, removeOneItem} = cartSlice.actions

export default cartSlice.reducer