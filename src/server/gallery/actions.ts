import { db } from "../db";
import 'server-only'
import { files, yearbooks } from "../db/schema";
import { asc, eq } from "drizzle-orm";
import { Filter } from "../type";
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
  return await db.select().from(yearbooks).orderBy(orderBy).rightJoin(files, eq(files.yearbook_id,yearbooks.id)).limit(10)

}
