import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: true, // Use SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 25000, // 25 seconds
      logger: false, // Enable logging
      debug: false, // Enable debugging
    });
  }

  // Send a bug report email
  async sendBugReport(fromEmail: string, subject: string, bugReport: string) {
    this.logger.log('sendBugReport called with:', { fromEmail, subject, bugReport }); // Log the input

    const mailOptions = {
      from: `"${fromEmail}" <${process.env.SMTP_USER}>`,
      to: 'app.flagged@gmail.com',
      subject: "[Bug Report]" + subject,
      text: bugReport,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully');
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  // Send a contact us email
  async sendContactUs(fromEmail: string, subject: string, message: string) {
    this.logger.log('sendContactUs called with:', { fromEmail, subject, message }); // Log the input

    const mailOptions = {
      from: `"${fromEmail}" <${process.env.SMTP_USER}>`,
      to: 'app.flagged@gmail.com',
      subject: subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully');
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}