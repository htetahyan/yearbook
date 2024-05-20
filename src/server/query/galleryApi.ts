import BASE_API from "~/server/query/BaseApi";
import {CardsType} from "~/server/gallery/actions";
import {NewCard} from "~/slices/cardSlice";

const galleryApi=BASE_API.injectEndpoints({
 endpoints: (builder) => ({
     getUserCards: builder.query({
         query: (id) => ({
             url: "/gallery",
             method: "GET",

         }),
         transformResponse: (response: any) => response.data as CardsType,
         providesTags:(result)=>(result ?result.map((card)=>({type:'cards',id:card.yearbook!.id})):['cards']),
     }),
     getCards: builder.query({
         query: ({limit,offset,filter}) => ({
             url: "/gallery",
             method: "GET",
             params: {limit,offset,filter},


         }),
         keepUnusedDataFor: 60,
         transformResponse: (response: any) => response.data as CardsType,
      providesTags:(result)=>(result ?result.map((card)=>({type:'cards',id:card.yearbook!.id})):['cards']),
     }),
     toggleLike: builder.mutation({
         query: (id) => ({
             url: "/gallery/like",
             method: "POST",
             params: {cardId: id}

         }),
         invalidatesTags: (result, error, arg) => [{ type: 'cards', id: arg }],

     }),getLikes: builder.query({
         query: () => ({
             url: "/gallery/like",
             method: "GET"
         }),
         providesTags: ['likes']
     }),
     createCard:builder.mutation({
         query:(data:NewCard)=> {
             const formData=new FormData()
             const fileName = data.image?.name
formData.append('file',data.image!)
             formData.append('data', JSON.stringify(data));

             return{
             url:"/gallery/create",
                 method: 'POST',
                 body: formData,
                 params:{fileName}

         }},
         invalidatesTags: ['cards']
     })
 })
})
export const {useGetCardsQuery,useToggleLikeMutation,useCreateCardMutation,useGetLikesQuery}=galleryApi
export default galleryApi
