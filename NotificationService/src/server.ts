import express from 'express'
import { serverconfig } from './config';
import v1router from './routes/v1/indexrouter';
import { AppErrorHandler, GenericErrorHandler } from './middlewares/errorhandeling';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { setupMailWorker } from './Processors/email.processor';
import { NotificationDTO } from './dtos/notification.dto';
import { addEmailToQueue } from './Producers/email.producer';
const app=express();
app.use(express.json());
app.use(attachCorrelationIdMiddleware)
app.use('/api/v1',v1router);
app.use(AppErrorHandler)
app.use(GenericErrorHandler)
app.listen(serverconfig.port,()=>{
    logger.info(`Server is running at ${serverconfig.port}`);
    setupMailWorker();
    logger.info("Mail worker setup completed")

    const sampleEmail:NotificationDTO={
        to:"sample",
        subject:"Test Email",
        templateId:"template_123",
        params:{
            name:"John Doe",
            orderId:"12345"
        }
    }
    addEmailToQueue(sampleEmail);
})