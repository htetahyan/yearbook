// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {relations, sql} from "drizzle-orm";
import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `${name}`);


export const users=createTable(
    'user',{
        id:bigint("id",{mode:"number"}).primaryKey().autoincrement(),

        name:varchar("name",{length:256})
,email:varchar('email',{length:256}).unique(),
        password:varchar("password",{length:256}).notNull(),

        createdAt:timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updatedAt").onUpdateNow(),
    },(table)=>{
        return{
            nameIdx:index("name_idx").on(table.name)
        }
    }
)

export const yearbooks=createTable(
    'yearbook',
    {
        id:bigint("id",{mode:"number"}).primaryKey().autoincrement(),
  student_id:varchar('student_id',{length:256}).notNull(),
        author:bigint('author_id',{mode:'number'}).references(()=> users.id)
    }
)

export const files=createTable('file',{
    id:bigint('id',{mode:"number"}).primaryKey().autoincrement(),
    url:varchar('url',{length:256}).notNull()
    ,size:bigint('size',{mode:'number'}).notNull(),
    yearbook_id:bigint('yearbook_id',{mode:'number'}).notNull()
})
export const yearbooksRelations=relations(yearbooks,({many,one})=>({
files:many(files),
    user:one(users,{
        fields:[yearbooks.author],
        references:[users.id]
    })
}))
export const filesRelations=relations(
    files,({one})=>({
yearbook:one(yearbooks,{
    fields: [files.yearbook_id],
    references: [yearbooks.id],
})
    })
)