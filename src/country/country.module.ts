import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

@Module({
  imports: [HttpModule],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}