import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CountryService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  async getCountries(): Promise<any> {
    const url = `https://restcountries.com/v3.1/all`;
    const response = await firstValueFrom(this.httpService.get(url));
    const countries = response.data;

    // Filter the countries
    const filteredCountries = countries.map(country => ({
      name: country.name.common,     // Use 'name.common' as the country name
      code: country.cca2,            // Use 'cca2' as the country code
      continent: country.region,     // Use 'region' as the continent
    }));

    return filteredCountries;
  }
  
  // Save the countries to a file
  async saveCountriesToFile(): Promise<void> {
    const countries = await this.getCountries(); // Get the countries
    const filePath = path.join(__dirname, 'countries.json'); // Define the file path
    fs.writeFileSync(filePath, JSON.stringify(countries, null, 2)); // Write the countries to the file
  }

  async onModuleInit() {
    await this.saveCountriesToFile();
  }
}