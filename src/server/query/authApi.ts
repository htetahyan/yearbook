import BASE_API from "~/server/query/BaseApi";
import {encryptPayload} from "~/server/security/payloadEncrypt";

const authApi=BASE_API.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/email/login",
                method: "POST",
                body: JSON.stringify(encryptPayload(data))
            })
        }),
        join: builder.mutation({

            query: (data) => ({
                url: "/auth/email/join",
                method: "POST",
                body: JSON.stringify(encryptPayload(data))
            })
        })
    })
})
export const {useLoginMutation,useJoinMutation}=authApi
export default authApi
