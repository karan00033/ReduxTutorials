import { createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    amount: 10,
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        increment: (state) => {
            state.amount +=1
        },
        decrement: (state) => {
            state.amount -=1
        },
        incrementByAmount: (state, action) => {
            state.amount +=action.payload
        }
    }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount} = accountSlice.actions;

export default accountSlice.reducer;