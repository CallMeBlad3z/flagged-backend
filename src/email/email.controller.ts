import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('report-bug')
  async reportBug(
    @Body('fromEmail') fromEmail: string,
    @Body('subject') subject: string,
    @Body('bugReport') bugReport: string,
  ) {
    return this.emailService.sendBugReport(fromEmail, subject, bugReport);
  }
}