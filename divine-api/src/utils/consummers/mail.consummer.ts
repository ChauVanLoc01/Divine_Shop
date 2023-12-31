import { MailerService } from '@nestjs-modules/mailer';
import { Processor, Process } from '@nestjs/bull';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common/decorators';
import { Job } from 'bull';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-store';

type EmailInfor = {
  to: string;
  subject: string;
  html: string;
};

type ForgotPasswordType = {
  email: string;
  code: string;
  user_id: string;
  email_infor: EmailInfor;
};

@Processor('email')
export class MailConsummer {
  constructor(
    private readonly mailService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Process('register')
  async register(job: Job<EmailInfor>) {
    await this.mailService.sendMail(job.data);
  }

  @Process('forgot-password')
  async forgotPassword(job: Job<ForgotPasswordType>) {
    const { code, email, email_infor, user_id } = job.data;
    await Promise.all([
      // @ts-ignore
      this.cacheManager.set(email, code, {
        ttl: 30,
      }),
      // @ts-ignore
      this.cacheManager.set(user_id, code, { ttl: 60 }),
      this.mailService.sendMail(email_infor),
    ]);
  }
}
