import { db } from "../db";
import 'server-only'
import {files, likes, NewLike, yearbooks} from "../db/schema";
import { asc, eq } from "drizzle-orm";
import { Filter } from "../type";
import {and} from "drizzle-orm/sql/expressions/conditions";
import {revalidateTag, unstable_cache} from "next/cache";
// Define interface Get as a constant
interface  Get {
    limit: number
    offset: number
} ;

// Define getCardsFromGallery function
export const getCardsFromGallery = async ({ limit, offset, filter }:  Get & { filter?: Filter }) => {
 switch (filter) {
     case 'newest':
         return await getCardsConstant({limit,offset,orderBy:asc(yearbooks.createdAt)});
     case 'oldest':
         return await getCardsConstant({limit,offset,orderBy:yearbooks.createdAt});
  case'a-z':
      return await getCardsConstant({limit,offset,orderBy:asc(yearbooks.name)});
 }
};
const getCardsConstant=async({limit,offset,orderBy}:{limit:number,offset:number,orderBy:any})=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await db.select().from(yearbooks).orderBy(orderBy).rightJoin(files, eq(files.yearbook_id,yearbooks.id)).limit(10)

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
 await db.delete(likes).where(and(eq(likes.author, userId), eq(likes.yearbook, id)))
    }
    catch (error: any) {
        throw new Error(error.message || 'Failed to unlike card, please try again')
    }
}
export const isCurrentUserLiked = async (id: number, userId: number) => {
const like=await db.select().from(likes).where(and(eq(likes.author,userId),eq(likes.yearbook,id)))
return like.length>0
}
