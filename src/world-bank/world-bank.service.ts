import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WorldBankService {
  constructor(private readonly httpService: HttpService) {}

  async getPopulationData(countryCode: string): Promise<any> {
    const url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data[1]; // The World Bank API returns an array, we need the second element
  }
}