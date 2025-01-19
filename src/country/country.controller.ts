// filepath: /d:/Projektit/globePal/backend/src/country/country.controller.ts
import { Controller, Get, Res, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  private readonly logger = new Logger(CountryController.name);

  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountries(@Res() res: Response) {
    // this.logger.log('getCountries endpoint hit')
    try {
      const countries = await this.countryService.getCountries();
      res.status(HttpStatus.OK).json(countries);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to fetch countries',
        error: error.message,
      });
    }
  }
}
