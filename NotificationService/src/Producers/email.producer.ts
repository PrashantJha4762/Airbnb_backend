import { NotificationDTO } from "../dtos/notification.dto";
import { mailerQueue } from "../Queues/mailer.queue";

export const MAILER_PAYLOAD="payload:mail"

export const addEmailToQueue=async (payload:NotificationDTO)=>{
    await mailerQueue.add(MAILER_PAYLOAD,payload)
    console.log("Email added to queue",JSON.stringify(payload))
} 
//The whole point of this function is to add the email to the queue, so that it can be processed by the worker later. This way, we can avoid blocking the main thread and improve the performance of our application. Here the payload is the email data that we want to send, which includes the recipient's email address, the subject of the email, the template ID for the email content, and any additional parameters needed for the template and the MAILER_PAYLOAD is a constant that we use to identify the type of job we are adding to the queue. This is useful when we have multiple types of jobs in the same queue, so that we can easily differentiate between them when processing the jobs in the worker.