import {configureStore} from "@reduxjs/toolkit"
import newUserReducer from "../features/NewUser/NewUserSlice"
import newLoginMessage from "../features/LoginInfo/LoginInfo"

export const store = configureStore({
    reducer: {
        newUser: newUserReducer,
        loginMessage: newLoginMessage
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch