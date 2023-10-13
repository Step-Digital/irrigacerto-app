import { CultureDomain } from "../../../../domain/culture.domain";
import { CultureRepository } from "../../../../repositories/culture";
import { CultureService } from "../../../../services/culture";
import { API } from "../../../../services/axios.service";
import { AuthRepository } from "../../../../repositories/auth";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeRemoteCulture = (): CultureDomain => {
  return new CultureService(
    new CultureRepository(API),
    new AuthRepository(API, new CacheRepository(AsyncStorage))
  );
};
