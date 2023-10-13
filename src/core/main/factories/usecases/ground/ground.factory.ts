import { GroundDomain } from "../../../../domain/ground.domain";
import { GroundRepository } from "../../../../repositories/ground";
import { GroundService } from "../../../../services/ground";
import { API } from "../../../../services/axios.service";
import { AuthRepository } from "../../../../repositories/auth";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeRemoteGround = (): GroundDomain => {
  return new GroundService(
    new GroundRepository(API),
    new AuthRepository(API, new CacheRepository(AsyncStorage))
  );
};
