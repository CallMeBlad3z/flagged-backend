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
  
    const filteredCountries = countries.map(country => ({
      name: country.name.common,
      code: country.cca2,
      continent: country.region, // Use 'region' as the continent
    }));

    return filteredCountries;
  }

  async saveCountriesToFile(): Promise<void> {
    const countries = await this.getCountries();
    const filePath = path.join(__dirname, 'countries.json');
    fs.writeFileSync(filePath, JSON.stringify(countries, null, 2));
  }

  async onModuleInit() {
    await this.saveCountriesToFile();
  }
}