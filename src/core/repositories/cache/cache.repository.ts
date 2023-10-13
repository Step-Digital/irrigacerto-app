import { CacheDomain } from "../../domain/cache.domain";
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import { DeleteDTO, GetDTO, SetDTO } from "../../dtos/cache";

export class CacheRepository implements CacheDomain {
  constructor(
    private readonly cacheClient: AsyncStorageStatic
  ) {}

  async get<T = any>(params: GetDTO): Promise<T> {
    const response = await this.cacheClient.getItem(params.key);
    return JSON.parse(response);
  }
  async set (params: SetDTO): Promise<any> {
    return await this.cacheClient.setItem(params.key, JSON.stringify(params.value));
  }
  async delete (params: DeleteDTO): Promise<any> {
    return await this.cacheClient.removeItem(params.key);
  }
}