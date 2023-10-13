import { CultureDataDomain } from "../../../../domain/cultureData.domain";
import { CultureDataRepository } from "../../../../repositories/cultureData";
import { CultureDataService } from "../../../../services/cultureData";
import { API } from "../../../../services/axios.service";
import { AuthRepository } from "../../../../repositories/auth";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeRemoteCultureData = (): CultureDataDomain => {
  return new CultureDataService(
    new CultureDataRepository(API),
    new AuthRepository(API, new CacheRepository(AsyncStorage))
  );
};
