import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loginInfo {
    message: string,
}

const innitialState: loginInfo = {
    message: ''
}

const newLoginMessage = createSlice({
    name: 'loginInformation',
    initialState: innitialState,
    reducers: {
        setLoginMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        },
        clearLoginMessage: (state) => {
            state.message = '';
        }
    }
})

export const {setLoginMessage, clearLoginMessage} = newLoginMessage.actions
export default newLoginMessage.reducer