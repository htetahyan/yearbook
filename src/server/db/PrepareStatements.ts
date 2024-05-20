import {db} from "~/server/db/index";
import {files, likes, yearbooks} from "~/server/db/schema";
import {eq} from "drizzle-orm";
import {desc} from "drizzle-orm/sql/expressions/select";

export const getCardsStatement=(limit:number,offset:number,orderBy?:any)=> db.select().from(yearbooks)
    .orderBy(orderBy)
    .rightJoin(files, eq(files.yearbook_id,yearbooks.id))
    .leftJoin(likes, eq(likes.yearbook,yearbooks.id))
    .limit(limit).offset(offset).prepare();
