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

  public static sendResetOtpMail(otp: Otp) {
    const content = `Hello from Bilfind!\n\nYour otp code to reset password is: ${otp.code}\n\nThis code is used to reset your Bilfind password. Please enter it in the app to complete the password reset process.\n\nIf you didn't request this code, please ignore this message.\n\nThank you for using Bilfind!`;

    const subject = "Your Bilfind Reset Password Code";
    this.sendMail(otp.email, content, subject);
  }

  public static sendBannedMail(to: string) {
    const content = `Hello from Bilfind!\n\nYou have been banned from BilFind indefinitely. \n\nIf you think there is a problem, please contact us.\n\nThank you for using Bilfind!`;

    const subject = "You are Banned from Bilfind";
    this.sendMail(to, content, subject);
  }

  public static sendReportStatusUpdateMail(to: string, reportedName: string, reportStatus: string) {
    const content = `Hello from Bilfind!\n\nWe reviewed ${reportedName}'s post you reported. \n\n Current status of your report: ${reportStatus}.\n\nThank you for using Bilfind!`;

    const subject = "We Reviewed Your Report";
    this.sendMail(to, content, subject);
  }

  public static sendReportStatusUpdateMailtoPostOwner(to: string, title: string) {
    const content = `Hello from Bilfind!\n\nWe reviewed your post with id ${title} and decided to remove it because it does not comply with our community rules.\n\nThank you for using Bilfind!`;

    const subject = "We removed your post";
    this.sendMail(to, content, subject);
  }
}
