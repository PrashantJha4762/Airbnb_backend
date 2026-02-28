import IORedis,{Redis} from 'ioredis';
import { serverConfig } from './index'; 
import Redlock from 'redlock';

// const redisClient=new ioredis(serverConfig.REDIS_SERVER_URL)

function connectToRedis() {
    try {

        let connection: Redis;

        return () => {
            if (!connection) {
                connection = new IORedis(serverConfig.REDIS_SERVER_URL);
                return connection;
            }

            return connection;
        }
        

    } catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
}

export const getRedisConnObject = connectToRedis();

export const redlock=new Redlock([getRedisConnObject()],{
    retryCount: 10,
    retryDelay: 200, // time in ms
    retryJitter: 200, // time in ms  
    driftFactor: 0.01 // time in ms    
})