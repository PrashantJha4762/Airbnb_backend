import express from 'express'
import { serverconfig } from './config';
import v1router from './routes/v1/indexrouter';
import { AppErrorHandler, GenericErrorHandler } from './middlewares/errorhandeling';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { addEmailToQueue } from './Producers/email.producer';
import { setupMailWorker } from './Processors/email.processor';
const app=express();
app.use(express.json());
app.use(attachCorrelationIdMiddleware)
app.use('/api/v1',v1router);
app.use(AppErrorHandler)
app.use(GenericErrorHandler)
app.listen(serverconfig.port,async()=>{
    setupMailWorker();
    logger.info(`Server is running at ${serverconfig.port}`);
    addEmailToQueue({
        to:"jhaprashant0804@gmail.com",
        subject:"Test Email from Notification Service",
        templateId:"welcome",
        params:{
            username:"John Doe",
            appname:"Airbnb"
        }    
    })
})
