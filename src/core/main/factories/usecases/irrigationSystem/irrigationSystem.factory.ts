import { IrrigationSystemDomain } from "../../../../domain/irrigationSystem.domain";
import { IrrigationSystemRepository } from "../../../../repositories/irrigationSystem";
import { IrrigationSystemService } from "../../../../services/irrigationSystem";
import { API } from "../../../../services/axios.service";
import { AuthRepository } from "../../../../repositories/auth";
import { CacheRepository } from "../../../../repositories/cache/cache.repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeRemoteIrrigationSystem = (): IrrigationSystemDomain => {
  return new IrrigationSystemService(
    new IrrigationSystemRepository(API),
    new AuthRepository(API, new CacheRepository(AsyncStorage))
  );
};
