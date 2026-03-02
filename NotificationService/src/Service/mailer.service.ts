import { serverconfig } from "../config";
import logger from "../config/logger.config";
import transporter from "../config/mailer.config";
import { InternalServerError } from "../utils/errors/app.error";

export async function sendmail(to:string,subject:string,body:string){
    if(!serverconfig.EMAIL_USER || !serverconfig.EMAIL_PASS){
        logger.error("Email credentials are missing. Set EMAIL_USER and EMAIL_PASS");
        throw new InternalServerError("Email configuration is missing")
    }

    try {
        await transporter.sendMail({
            from: serverconfig.EMAIL_USER,
            to,
            subject,
            html:body
        })
        logger.info(`Email sent to ${to} with subject ${subject}`);
    } catch (error) {
        const smtpError = error as Error;
        logger.error(`Failed to send email: ${smtpError.message}`);
        throw new InternalServerError("Failed to send email")
    }
}
