// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {relations, sql} from "drizzle-orm";
import {
    bigint,
    text,
    index,
    mysqlTableCreator,
    timestamp,
    varchar,
    primaryKey,
    int, uniqueIndex,
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
        id:bigint("id",{mode:"number"}).primaryKey().autoincrement().notNull(),

        name:varchar("name",{length:256})
        ,email:varchar('email',{length:256}).unique(),
        password:varchar("password",{length:256}).notNull(),
 createdAt: timestamp("created_at").notNull().default(sql`now()`).defaultNow(),
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
        name:varchar("name",{length:256}).notNull(),
        academicYear:varchar("academicYear",{length:256}).notNull(),
        campus:varchar("campus",{length:256}).notNull(),
        border:varchar("border",{length:256}).notNull(),

        caption:varchar("caption",{length:256}).notNull(),
        student_id:varchar('student_id',{length:256}).notNull(),
        total_likes:bigint('total_likes',{mode:'number'}).default(0).notNull(),
        author_id: bigint('author_id',{mode:'number'}).references(() => users.id).notNull(),
       createdAt: timestamp("created_at").notNull().default(sql`now()`).defaultNow(),
    },
    (table)=>{
        return{
            nameIdx:index("name_idx").on(table.author_id),

        }
    }
)
export const usersRelations=relations(
    users,({one,many})=>({
        yearbooks:one(yearbooks),
        likes:many(likes),
        comments:many(comments)

    })
)

export const files=createTable('files',{
    id:bigint('id',{mode:"number"}).primaryKey().autoincrement(),
    url:varchar('url',{length:256}).notNull()
  ,
    yearbook_id:bigint('yearbook_id',{mode:'number'}).references(() => yearbooks.id).notNull()
})
export const likes=createTable(
    'likes',{
        id:bigint('id',{mode:"number"}).primaryKey().autoincrement(),
        author:bigint('author_id',{mode:'number'}).references(() => users.id).notNull(),
        createdAt:timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        yearbook:bigint('yearbook_id',{mode:'number'}).references(() => yearbooks.id).notNull(),
    },(table)=>{
        return{
            nameIdx:index("name_idx").on(table.author),
            uniqueIdx:uniqueIndex("unique_idx").on(table.author,table.yearbook)
        }
    }
)
export const yearbooksRelations=relations(yearbooks,({many,one})=>({
    files:many(files),
    likes:many(likes),
    comments:many(comments)
}))
export const comments=createTable(
    'comment',{
        id:bigint('id',{mode:"number"}).primaryKey().autoincrement(),
        content:text('content').notNull(),
        author:bigint('author_id',{mode:'number'}).references(() => users.id).notNull(),
      createdAt: bigint('created_at',{mode:'number'}).notNull()
  ,
        yearbook:bigint('yearbook_id',{mode:'number'}).references(() => yearbooks.id).notNull(),
    },(table)=>{
        return{
            nameIdx:index("name_idx").on(table.author)
        }
    }
)
export const commentsRelations=relations(
    comments,({many,one})=>({
        yearbook:many(yearbooks),
    }),
)

export const yearbooksToComments = createTable(
    'yearbooksToComment',
    {
        yearbook_id: bigint('yearbook_id',{mode:'number'})
            .notNull()
            .references(() => yearbooks.id),
        comment_id: bigint('comment_id',{mode:'number'})
            .notNull()
            .references(() => comments.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.yearbook_id, t.comment_id] }),
    }),
);



export type NewUser = typeof users.$inferInsert;
export type NewLike = typeof likes.$inferInsert;
export type InsertCard=typeof yearbooks.$inferInsert
