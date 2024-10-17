import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WorldBankService } from './world-bank.service';
import { WorldBankController } from './world-bank.controller';

@Module({
  imports: [HttpModule], // Import HttpModule here
  providers: [WorldBankService],
  controllers: [WorldBankController],
})
export class WorldBankModule {}