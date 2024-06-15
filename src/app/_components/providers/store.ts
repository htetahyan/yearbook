import { configureStore } from '@reduxjs/toolkit'
import BASE_API from "~/server/query/BaseApi";
import {CustomSonnerLoaderMiddleWare} from "~/server/query/CustomSonnerLoaderMiddleWare";
import cardSliceReducer from "~/slices/cardSlice";
import filterSliceReducer from "~/slices/filterSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            card: cardSliceReducer,
            filter:filterSliceReducer,
            // Add the generated reducer as a specific top-level slice
            [BASE_API.reducerPath]: BASE_API.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(BASE_API.middleware,CustomSonnerLoaderMiddleWare),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const store = makeStore()
