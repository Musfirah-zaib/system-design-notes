// config/redisClient.js
const redis = require('redis');

// Redis client ka setup jo backend ko bataye ga ke Redis kahan chal raha hai
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379' // Default port 6379 hota hai
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect karna
redisClient.connect().then(() => {
    console.log('Connected to Redis Successfully! 🚀');
});

module.exports = redisClient;
