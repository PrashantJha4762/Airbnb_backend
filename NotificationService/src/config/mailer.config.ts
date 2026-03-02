import nodemailer from 'nodemailer';
import { serverconfig } from '.';

const transporter = nodemailer.createTransport({
    service: 'gmail',   
    auth: {
        user: serverconfig.EMAIL_USER,
        pass: serverconfig.EMAIL_PASS,
    },
});

export default transporter;