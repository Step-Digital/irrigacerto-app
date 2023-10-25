import { AuthDomain } from "../../../../domain/auth.domain";
import { AuthRepository } from "../../../../repositories/auth";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import { AuthService } from "../../../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API } from "../../../../services/axios.service";

export const makeRemoteAuth = (): AuthDomain => {
  return new AuthService(
    new AuthRepository(API, new CacheRepository(AsyncStorage))
  );
};
