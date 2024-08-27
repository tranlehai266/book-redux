import { configureStore } from "@reduxjs/toolkit";
import pageSlice from "../features/pageSlice";


const store = configureStore({
    reducer: {
        page : pageSlice
    }
})

export default store;