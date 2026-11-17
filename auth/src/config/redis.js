const Redis = require("ioredis");

const cacheInstance = new Redis(process.env.REDIS_URI);

module.exports = cacheInstance;
