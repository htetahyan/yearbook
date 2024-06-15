import { CommentTypes } from "../gallery/comments/actions";
import BASE_API from "./BaseApi";

const commentApi = BASE_API.injectEndpoints({

    endpoints: (builder) => ({
        getComments: builder.query({
            query: ({id,limit,offset}) => ({
                url: "/gallery/comments",
                method: "GET",
                params: { cardId: id ,limit,offset}

            }),
            providesTags: (result, error, arg) => (result ? result.map((comment) => ({ type: 'comments', id: arg })) : ['comments']),

             transformResponse: (response: any) => response.data as CommentTypes,

        }),
        postComment: builder.mutation({
            query: ({content,card_id}) => ({
                url: `/gallery/comments?cardId=${card_id}`,
                method: "POST",

                body: JSON.stringify(content)
            }),
         invalidatesTags: (result, error, arg) => [{ type: 'comments', id: arg.card_id }],
        })
    })
})
export const { useGetCommentsQuery, usePostCommentMutation }=commentApi
export default commentApi
