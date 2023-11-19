import { createTransport } from "nodemailer";
import { Otp } from "../models/otp-model";
import Logging from "./logging";

export class MailHelper {
    public static sendMail(to: string, content: string, subject: string) {
         //sending email to the related user
    const transporter = createTransport({
        service: "gmail",
        auth: {
          user: process.env.HOST_MAIL,
          pass: process.env.HOST_MAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.HOST_MAIL,
        to,
        subject,
        text: content,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          Logging.error(error);
        } else {
          Logging.log("Email sent: " + info.response);
        }
      });
    }

    public static sendRegisterOtpMail(otp: Otp) {
        const content = `Hello from Bilfind!\n\nYour verification code is: ${otp.code}\n\nThis code is used to verify your identity for Bilfind.Please enter it in the app to complete the verification process. Keep your account secure by not sharing this code with anyone.\n\nIf you didn't request this code, please ignore this message.\n\nThank you for using Bilfind!`;

        const subject = "Your Bilfind Verification Code";
        this.sendMail(otp.email, content, subject);

    }
}