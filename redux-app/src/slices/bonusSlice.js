import { createAction,createSlice } from "@reduxjs/toolkit";
const initialState = {
    points: 11,
}

export const bonusSlice = createSlice({
    name: 'bonus',
    initialState,
    reducers: {
        increment: (state) => {
            state.points += 1
        }
    }
})

export const { increment } = bonusSlice.actions
export default bonusSlice.reducer;