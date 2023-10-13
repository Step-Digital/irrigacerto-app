import { CacheDomain } from "../../domain/cache.domain";
import { DeleteDTO, GetDTO, SetDTO } from "../../dtos/cache";
import { CacheRepository } from "../../repositories/cache/cache.repository";

export class CacheService implements CacheDomain {
  constructor(private readonly cacheRepository: CacheRepository) {}

  async get(params: GetDTO): Promise<any> {
    try {
      return await this.cacheRepository.get(params);
    } catch (error) {
      return error;
    }
  }
  async set(params: SetDTO): Promise<any> {
    try {
      return await this.cacheRepository.set(params);
    } catch (error) {
      return error;
    }
  }
  async delete(params: DeleteDTO): Promise<any> {
    try {
      return await this.cacheRepository.delete(params);
    } catch (error) {
      return error;
    }
  }
}
