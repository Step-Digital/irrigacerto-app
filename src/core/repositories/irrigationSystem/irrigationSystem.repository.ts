import { IrrigationSystemDomain } from "../../domain/irrigationSystem.domain";

import {
  SystemInfoDTO,
} from "../../dtos/newProperty";
import { AxiosInstance } from "axios";

export class IrrigationSystemRepository implements IrrigationSystemDomain {
  constructor(private readonly httpClient: AxiosInstance) {}
  async newIrrigationSystem(params: SystemInfoDTO, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.post<any>("/sistemairrigacao", params, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async getSystems(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/sistemairrigacao", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async deleteSystem(params: number, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.delete<any>(`/sistemairrigacao/${params}`, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }
}
