import { drizzle } from "drizzle-orm/mysql2";
import * as schema from './schema';
import mysql from "mysql2/promise";
import {migrate} from "drizzle-orm/mysql2/migrator";
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
/*await migrate(db, { migrationsFolder: './src/server/db/migrations'});

// Don't forget to close the connection, otherwise the script will hang
    await client.end();*/
