import { Controller, Get, Param } from '@nestjs/common';
import { WorldBankService } from './world-bank.service';

@Controller('world-bank')
export class WorldBankController {
  constructor(private readonly worldBankService: WorldBankService) {}

  @Get('population/:countryCode')
  async getPopulationData(@Param('countryCode') countryCode: string) {
    return this.worldBankService.getPopulationData(countryCode);
  }
}