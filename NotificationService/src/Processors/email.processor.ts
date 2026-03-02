import { renderMailTemplate } from "../../Templates/template.handler";
import { getRedisConnObject } from "../config/redis.config";
import { NotificationDTO } from "../dtos/notification.dto";
import { MAILER_PAYLOAD } from "../Producers/email.producer";
import { MAILER_QUEUE } from "../Queues/mailer.queue";
import { Worker } from "bullmq";
import{type ConnectionOptions} from "bullmq"
import { sendmail } from "../Service/mailer.service";

export const setupMailWorker=()=>{
    const emailProcessor=new Worker<NotificationDTO>(
    MAILER_QUEUE,
    async (job)=>{
        if(job.name!==MAILER_PAYLOAD){
            throw new Error("Invalid job type")
        }
        //else call the service layer to send the email
        const payload=job.data
        console.log("Processing email job with payload",payload)
        const emailcontent= await renderMailTemplate(payload.templateId,payload.params)
            // Here we can call the mailer service to send the email with the rendered content
            await sendmail(payload.to,payload.subject,emailcontent)
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

