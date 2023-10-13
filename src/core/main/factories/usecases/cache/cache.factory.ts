import AsyncStorage from "@react-native-async-storage/async-storage";
import { CacheDomain } from "../../../../domain/cache.domain";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import { CacheService } from "../../../../services/cache";

export const makeRemoteCache = (): CacheDomain => {
  return new CacheService(new CacheRepository(AsyncStorage))
}