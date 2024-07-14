import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Userslice"
export const store=configureStore({
    reducer:{
        user:userSlice,
    }
})