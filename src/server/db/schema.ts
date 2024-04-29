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
        author:bigint('author_id',{mode:'number'})
    },
    (table)=>{
        return{
            nameIdx:index("name_idx").on(table.author)
        }
    }
)
export const usersRelations=relations(
    users,({one,many})=>({
        yearbook: one(yearbooks,{
            fields:[users.id],
            references:[yearbooks.author]
        }),
        likes:many(likes),
        comments:many(comments)

    })
)

export const files=createTable('files',{
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
    }),
    likes:many(likes),
    comments:many(comments)
}))
export const filesRelations=relations(
    files,({one})=>({
        yearbook:one(yearbooks,{
            fields: [files.yearbook_id],
            references: [yearbooks.id],
        })
    })
)
export const comments=createTable(
    'comment',{
        id:bigint('id',{mode:"number"}).primaryKey().autoincrement(),
        content:text('content').notNull(),
        author:bigint('author_id',{mode:'number'}),
        createdAt:timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        yearbook:bigint('yearbook_id',{mode:'number'}),
    },(table)=>{
        return{
            nameIdx:index("name_idx").on(table.author)
        }
    }
)
export const commentsRelations=relations(
    comments,({many,one})=>({
        yearbook:many(yearbooks),
        author:one(users,{
            fields:[comments.author],
            references:[users.id]
        })
    }),
)
export const likes=createTable(
    'like',{
        id:bigint('id',{mode:"number"}).primaryKey().autoincrement(),
        author:bigint('author_id',{mode:'number'}),
        createdAt:timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        yearbook:bigint('yearbook_id',{mode:'number'}).notNull(),
    },(table)=>{
        return{
            nameIdx:index("name_idx").on(table.author)
        }
    }
)
export const likesRelations=relations(
    likes,({one})=>({
        yearbooks:one(yearbooks,{
            fields:[likes.yearbook],
            references:[yearbooks.id]
        }),

        author:one(users,{
            fields:[likes.author],
            references:[users.id]
        })
    }),
)



export type NewUser = typeof users.$inferInsert;