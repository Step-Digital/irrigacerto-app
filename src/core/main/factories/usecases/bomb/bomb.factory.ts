import { BombDomain } from "../../../../domain/bomb.domain";
import { BombRepository } from "../../../../repositories/bomb";
import { BombService } from "../../../../services/bomb";
import { API } from "../../../../services/axios.service";
import { AuthRepository } from "../../../../repositories/auth";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeRemoteBomb = (): BombDomain => {
  return new BombService(
    new BombRepository(API),
    new AuthRepository(API, new CacheRepository(AsyncStorage))
  );
};
