
export const REDIS_URL = `rediss://${process.env.REDIS_KEY}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
// console.debug("REDIS_URL", REDIS_URL);

export const ENABLE_CACHE = true;

// export const DEFAULT_REGISTER_OPTIONS = {
//   ttl: 60,
//   max: 2048,
//   //@ts-ignore redisStore type is incompatible
//   store: redisStore,
//   url: REDIS_URL,
// }