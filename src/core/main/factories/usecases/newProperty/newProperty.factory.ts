import { NewPropertyDomain } from "../../../../domain/newProperty.domain";
import { NewPropertyRepository } from "../../../../repositories/newProperty";
import { NewPropertyService } from "../../../../services/newProperty";
import { API } from "../../../../services/axios.service";
import { AuthRepository } from "../../../../repositories/auth";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeRemoteNewProperty = (): NewPropertyDomain => {
  return new NewPropertyService(
    new NewPropertyRepository(API),
    new AuthRepository(API, new CacheRepository(AsyncStorage))
  );
};
