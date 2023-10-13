import { GroundDomain } from "../../domain/ground.domain";

import {
  NewGroundDTO,
} from "../../dtos/newProperty";
import { AxiosInstance } from "axios";

export class GroundRepository implements GroundDomain {
  constructor(private readonly httpClient: AxiosInstance) {}
  async newGround(params: NewGroundDTO, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.post<any>("/solo", params, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async getGrounds(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/solo", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async deleteGround(params: number, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.delete<any>(`/solo/${params}`, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async editGround(params: any, id: number, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.patch<any>(`/solo/${id}`, params, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }
}
