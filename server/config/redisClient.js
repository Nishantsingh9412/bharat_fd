import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6380,
        tls: true,
    },
    password: process.env.REDIS_PASSWORD 
});

// Connect to Redis
redisClient.connect()
    .then(() => console.log("Redis client connected"))
    .catch((err) => console.error("Redis client error:", err));

redisClient.on("error", (err) => {
    console.error("Redis client error:", err);
});

export default redisClient;
