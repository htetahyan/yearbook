import { drizzle } from "drizzle-orm/mysql2";
import * as schema from './schema';
import mysql from "mysql2/promise";
const config = {
uri:process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,

  ssl:{
    rejectUnauthorized: false,


  }
};
export const client = mysql.createPool(config);
export async function initDb() {


  return drizzle(client,{schema,mode:'default'});


}
export const db=await initDb().catch((e)=>{throw new Error('s')})
