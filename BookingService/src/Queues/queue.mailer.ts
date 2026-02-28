import { Queue, type ConnectionOptions } from 'bullmq';
import { getRedisConnObject } from '../config/redis.config';

export const MAILER_QUEUE="queue-mailer";

export const mailerQueue=new Queue(MAILER_QUEUE,{
    // ioredis is duplicated in dependency tree; cast keeps runtime behavior with your singleton instance.
    connection:getRedisConnObject() as unknown as ConnectionOptions
});
