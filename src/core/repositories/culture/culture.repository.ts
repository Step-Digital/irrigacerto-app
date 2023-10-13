import { CultureDomain } from "../../domain/culture.domain";

import {
  NewCultureDTO,
} from "../../dtos/culture";
import { AxiosInstance } from "axios";

export class CultureRepository implements CultureDomain {
  constructor(private readonly httpClient: AxiosInstance) {}
  async newCulture(params: NewCultureDTO, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.post<any>("/cultura", params, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async getCultures(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/cultura", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

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

  async deleteCulture(params: number, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.delete<any>(`/cultura/${params}`, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async editCulture(params: any, id: number, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.patch<any>(`/cultura/${id}`, params, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }
}
