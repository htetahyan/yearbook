import {env} from "~/env";
import Redis from "ioredis";

const getRedisUrl = () => {
   try {
       return env.REDIS_URL
   }catch (e) {
     throw new Error("Server Error code 304:")
   }
}
export const redis = new Redis(getRedisUrl());
