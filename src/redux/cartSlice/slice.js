import {createSlice} from '@reduxjs/toolkit'

export const selectCart = (state) => state.cart

const initialState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
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
        removeOneItem: (state, action) => {
            const find = state.items.find((item) => item.id === action.payload.id
                && item.type === action.payload.type && item.size === action.payload.size);

            if (find.count > 1) {
                find.count--
                state.totalPrice -= action.payload.price
            } else if (find) {
                state.items = state.items.filter(item => item.id !== action.payload.id
                    || item.type !== action.payload.type || item.size !== action.payload.size)

                state.totalPrice -= action.payload.price
            }
        },
        removeItem: (state, action) => {
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