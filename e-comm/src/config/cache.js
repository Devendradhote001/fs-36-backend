import Redis from "ioredis";

const cacheInstance = new Redis(process.env.REDIS_URI);

export default cacheInstance;
