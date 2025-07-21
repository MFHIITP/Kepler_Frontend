import {configureStore} from "@reduxjs/toolkit"
import newUserReducer from "../features/NewUser/NewUserSlice"

export const store = configureStore({
    reducer: {
        newUser: newUserReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch