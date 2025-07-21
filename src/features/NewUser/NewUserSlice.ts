import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface newUser {
    email: string
}

const innitialState: newUser = {
    email: ''
}

const newUserReducer = createSlice({
    name: "newUser",
    initialState: innitialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        clearEmail: (state) => {
            state.email = ''
        }
    }
})

export const {setEmail, clearEmail} = newUserReducer.actions
export default newUserReducer.reducer