import {db} from "~/server/db/index";
import {comments, files, likes, users, yearbooks} from "~/server/db/schema";
import {count, eq} from "drizzle-orm";
import {desc} from "drizzle-orm/sql/expressions/select";
import { sql } from 'drizzle-orm';
import {cache} from "react";
export const getCardsStatement=(limit:number,offset:number,orderBy?:any)=> db.select().from(yearbooks)
    .orderBy(orderBy)
    .rightJoin(files, eq(files.yearbook_id,yearbooks.id))
    .leftJoin(likes, eq(likes.yearbook,yearbooks.id))

    .limit(limit).offset(offset).

    prepare();
export const getCardsCounts=cache(async (orderBy:any) => {

    const res=await  db.select({count: count()}).from(yearbooks)
        .orderBy(orderBy).execute()
return  res ? res[0]?.count : 0

})
export const getCommentsStatement = (limit: number, offset: number, yearbookId: number) =>  db.select({
    comments: {
        id: comments.id,
        content: comments.content,
      createdAt: comments.createdAt,
        yearbook: comments.yearbook,
    },
    users: {
        id: users.id,
        name: users.name
    }
}).from(comments).where(eq(comments.yearbook, yearbookId)).rightJoin(users, eq(users.id, comments.author))
    .limit(limit).offset(offset).orderBy(desc(comments.createdAt))
    .prepare()
