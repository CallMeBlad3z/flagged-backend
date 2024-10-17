import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorldBankModule } from './world-bank/world-bank.module';

@Module({
  imports: [HttpModule, WorldBankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}