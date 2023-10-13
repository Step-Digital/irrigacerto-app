import { DeleteDTO, GetDTO, SetDTO } from "../dtos/cache";

export interface CacheDomain {
  get: (params: GetDTO) => Promise<any>;
  set: (params: SetDTO) => Promise<any>;
  delete: (params: DeleteDTO) => Promise<any>;
}