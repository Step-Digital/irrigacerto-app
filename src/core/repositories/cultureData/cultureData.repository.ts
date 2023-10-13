import { CultureDataDomain } from "../../domain/cultureData.domain";

import {
  NewCultureDTO,
} from "../../dtos/culture";
import { AxiosInstance } from "axios";

export class CultureDataRepository implements CultureDataDomain {
  constructor(private readonly httpClient: AxiosInstance) {}
  async getCulturesData(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/dadoscultura", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }
}
