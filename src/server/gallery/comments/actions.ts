
import { cache } from "react"
import { db } from "~/server/db"
import { getCommentsStatement } from "~/server/db/PrepareStatements"
import { comments } from "~/server/db/schema"

export const getComments =cache( async(limit: number, offset: number, yearbookId: number) => {
   return await getCommentsStatement(limit, offset, yearbookId).execute()
})
export type CommentTypes=Awaited<ReturnType<typeof getComments>>
export type CommentType<T, I extends number | keyof T> = T extends Array<infer U> ? U : never;
export type Comment = CommentType<CommentTypes, 0>; // Adjust the index as needed

export const postComment = async (content: string, card_id: number, userId: number) => {
    const createdAt=new Date().getTime() / 1000
    await db
    
        .insert(comments)
        .values({ content, yearbook: card_id, author: userId ,createdAt:createdAt})
    
}