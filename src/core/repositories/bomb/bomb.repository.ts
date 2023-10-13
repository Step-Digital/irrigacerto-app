import { BombDomain } from "../../domain/bomb.domain";

import {
  NewBombDTO,
} from "../../dtos/newProperty";
import { AxiosInstance } from "axios";

export class BombRepository implements BombDomain {
  constructor(private readonly httpClient: AxiosInstance) {}
  async newBomb(params: NewBombDTO, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.post<any>("/motobomba", params, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async getBombs(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/motobomba", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async deleteBomb(params: number, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.delete<any>(`/motobomba/${params}`, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }
}
