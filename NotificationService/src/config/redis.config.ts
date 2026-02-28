import Redis from 'ioredis';
import { serverconfig } from './index';

function connectRedis() {
    try {
        const redisconfig={
            port:serverconfig.REDIS_PORT,
            host:serverconfig.REDIS_HOST,
            maxRetriesPerRequest:null,
        }
        let connection:Redis;

        return ()=>{
            if(!connection){
                connection=new Redis(redisconfig);
            }
            return connection;
        }

    } catch (error) {
        console.log("Error connecting to the redis",error);
        throw error;
    }  
}

//This is a singleton connection function, it will return the same connection instance whenever called. It will create a new connection only if there is no existing connection.

//singleton objects are those objects which is created only once during the entire code execution

export const getRedisConnObject=connectRedis();