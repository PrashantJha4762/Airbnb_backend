import { getRedisConnObject } from "../config/redis.config";
import { NotificationDTO } from "../dtos/notification.dto";
import { MAILER_PAYLOAD } from "../Producers/email.producer";
import { MAILER_QUEUE } from "../Queues/mailer.queue";
import { Worker } from "bullmq";
import{type ConnectionOptions} from "bullmq"

export const setupMailWorker=()=>{
    const emailProcessor=new Worker<NotificationDTO>(
    MAILER_QUEUE,
    async (job)=>{
        if(job.name!==MAILER_PAYLOAD){
            throw new Error("Invalid job type")
        }
        //else call the service layer to send the email
    },
    {
    connection:getRedisConnObject() as unknown as ConnectionOptions
    }
)

emailProcessor.on("completed",()=>{
    console.log("Email job completed",)
})

emailProcessor.on("failed",()=>{
    console.log("Email job failed")
})
}