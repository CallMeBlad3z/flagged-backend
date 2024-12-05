import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';

@Module({
  imports: [HttpModule, CountryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}