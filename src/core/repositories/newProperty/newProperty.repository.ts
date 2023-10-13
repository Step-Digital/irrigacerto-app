import { NewPropertyDomain } from "../../domain/newProperty.domain";

import {
  NewPropertyDTO,
  NewGroundDTO,
  NewBombDTO,
  SystemInfoDTO,
} from "../../dtos/newProperty";
import { AxiosInstance } from "axios";

export class NewPropertyRepository implements NewPropertyDomain {
  constructor(private readonly httpClient: AxiosInstance) {}
  async newProperty(params: NewPropertyDTO, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.post<any>("/propriedade", params, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async getProperties(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/propriedade", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

  async getAllPropertiesData(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/propriedade/allPropertyData", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }


  async getAllPropertiesItems(token: string): Promise<any> {
    const {
      data,
    } = await this.httpClient.get<any>("/propriedade/allPropertyItems", {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }

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

  async deleteProperty(params: number, token: string): Promise<any> {
    const {
      data: { data },
    } = await this.httpClient.delete<any>(`/propriedade/${params}`, {
      headers: {
        ["Authorization"]: `Bearer ${token}`
      }
    });
    return {
      data,
    };
  }
}
