import 'server-only';
import {db} from "../db";
import {files, InsertCard, likes, NewLike, yearbooks} from "../db/schema";
import {asc, eq} from "drizzle-orm";
import {Filter} from "../type";
import {and} from "drizzle-orm/sql/expressions/conditions";
import {revalidateTag} from "next/cache";
import {desc} from "drizzle-orm/sql/expressions/select";
import {getCardsStatement} from "~/server/db/PrepareStatements";
import {NewCard} from "~/slices/cardSlice";
import {cache} from "react";

// Define interface Get as a constant
interface  Get {
    limit: number
    offset: number
} ;

export type CardsType=Awaited<ReturnType<typeof getCardsFromGallery>>
export type CardType<T, I extends number | keyof T> = T extends Array<infer U> ? U : never;
export type Card = CardType<CardsType, 0>; // Adjust the index as needed


// Define getCardsFromGallery function
export const getCardsFromGallery = async ({ limit=10, offset=0, filter='newest' }:  Get & { filter?: Filter }) => {
 switch (filter) {
     case 'newest':
         return await getCardsConstant({limit,offset,orderBy:asc(yearbooks.createdAt)});
     case 'oldest':
         return await getCardsConstant({limit,offset,orderBy:desc(yearbooks.createdAt)});
  case'a-z':
      return await getCardsConstant({limit,offset,orderBy:asc(yearbooks.name)});
  case'z-a':
      return await getCardsConstant({limit,offset,orderBy:desc(yearbooks.name)});

 }

};
const getCardsConstant=async({limit,offset,orderBy}:{limit:number,offset:number,orderBy:any})=>{

  return await  getCardsStatement(limit,offset,orderBy).execute()

}
export const likeCard = async (id: number, userId: number) => {
   try {
       const card = await db.select().from(yearbooks).where(eq(yearbooks.id, id))

       if (card.length === 0) {
           throw new Error('Card not found')
       }
       const newLike: NewLike = {
           author: userId,
           yearbook: id

       }
       await db.insert(likes).values(newLike)
   }
   catch (error: any) {
       throw new Error(error.message || 'Failed to like card, please try again')
   }
}
export const unlikeCard = async (id: number, userId: number) => {
    try {
        const card = await db.select().from(yearbooks).where(eq(yearbooks.id, id))
        if (card.length === 0) {
            throw new Error('Card not found')
        }
 await db.delete(likes).where(and(eq(likes.author, userId), eq(likes.yearbook, id))).finally(() => revalidateTag('gallery'))
    }
    catch (error: any) {
        throw new Error(error.message || 'Failed to unlike card, please try again')
    }
}
export const toggleLike = async (id: number, userId: number) => {

    const isLiked = await isCurrentUserLiked(id, userId)
    if (isLiked) {
        await unlikeCard(id, userId)
        console.log('function runned ')
    } else {
        await likeCard(id, userId)
    }
}
export const createYearbookCard = async (data: NewCard,image:string,authorId:number) => {
    try {

        const newCard:InsertCard = {
            name : data.name,
            border : data.border,
            campus :data.campus,
            caption : data.caption,


            academicYear : data.academicYear,
            student_id: data.studentId,
            total_likes:0,
            author_id: authorId,

        }

        await db.transaction( async (tx) => {
            const card=    await tx.insert(yearbooks).values(newCard)
             await tx.insert(files).values({url:image,yearbook_id:card[0].insertId})
        })



} catch (e:any){
        throw new Error(e.message || 'Failed to create card, please try again')
    }
}
export const isCardAlreadyExist = async (name: string,studentId:string) => {

    const card=await db.select().from(yearbooks).where(and(eq(yearbooks.name,name),eq(yearbooks.student_id,studentId)))
    return card.length>0

}
export const isCurrentUserLiked = async (id: number, userId: number) => {
const like=await db.select().from(likes).where(and(eq(likes.author,userId),eq(likes.yearbook,id)))

    return like.length>0
}
export const getUserCards = async (userId: number) => {
    return await db
        .select()
        .from(yearbooks)
        .where(eq(yearbooks.author_id, userId))
        .leftJoin(files, eq(yearbooks.id, files.yearbook_id))
        .leftJoin(likes, eq(yearbooks.id, likes.yearbook))
        .orderBy(desc(yearbooks.createdAt))
}
