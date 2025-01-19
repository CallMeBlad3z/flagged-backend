import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, delay, retryWhen, take } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CountryService implements OnModuleInit {
  private readonly logger = new Logger(CountryService.name);

  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<any> {
    const url = `https://restcountries.com/v3.1/all?fields=name,cca2,region`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { timeout: 60000, maxContentLength: Infinity, maxBodyLength: Infinity }).pipe(
          retryWhen(errors => errors.pipe(delay(1000), take(3)))
        )
      );
      const countries = response.data;

      // Filter the countries
      const filteredCountries = countries.map(country => ({
        name: country.name.common,     // Use 'name.common' as the country name
        code: country.cca2,            // Use 'cca2' as the country code
        continent: country.region,     // Use 'region' as the continent
      }));

      return filteredCountries;
    } catch (error) {
      this.logger.error('Error fetching countries:', error.message);
      throw new Error('Failed to fetch countries');
    }
  }

  // Save the countries to a file
  async saveCountriesToFile(): Promise<void> {
    try {
      const countries = await this.getCountries(); // Get the countries
      const filePath = path.join(__dirname, 'countries.json'); // Define the file path
      fs.writeFileSync(filePath, JSON.stringify(countries, null, 2)); // Write the countries to the file
      this.logger.debug(`Countries saved to file: ${filePath}`);
    } catch (error) {
      this.logger.error('Error saving countries to file:', error.message);
      this.logger.error('Error details:', error);
    }
  }

  async onModuleInit() {
    await this.saveCountriesToFile();
  }
}