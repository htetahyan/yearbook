import { type Config } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
  },
  tablesFilter: ["*"],
} satisfies Config;
