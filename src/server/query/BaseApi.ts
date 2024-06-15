import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {customCreateApi} from "~/server/query/customCreateApi";
import { HYDRATE } from 'next-redux-wrapper'
import {Action} from "redux";
import {PayloadAction} from "@reduxjs/toolkit";

type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
    return action.type === HYDRATE
}

// Define a service using a base URL and expected endpoints
export const BASE_API = createApi({
    reducerPath: 'BASE_API',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),

    tagTypes: ['cards','likes','users','comments'],
    endpoints: (builder) => ({

    }),
    extractRehydrationInfo(action, { reducerPath }): any {
        if (isHydrateAction(action)) {
            return action.payload[reducerPath]
        }
    },
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  } = BASE_API
export default BASE_API
