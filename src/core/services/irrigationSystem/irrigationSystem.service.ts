import { STATUS_CODE } from "../../../utils";
import { UserUnauthorized, UnexpectedError } from "../auth/errors";

import {
  SystemInfoDTO,
} from "../../dtos/newProperty";

import { IrrigationSystemDomain } from "../../domain/irrigationSystem.domain";
import { IrrigationSystemRepository } from "../../repositories/irrigationSystem/irrigationSystem.repository";
import { AuthRepository } from "../../repositories/auth";

export class IrrigationSystemService implements IrrigationSystemDomain {
  constructor(
    private readonly irrigationSystemRepository: IrrigationSystemRepository,
    private readonly authRepository: AuthRepository
  ) {}

  async newIrrigationSystem(params: SystemInfoDTO): Promise<any> {
    try {
      console.log("ENTREI SYSTEM NEW")
      const { token } = await this.authRepository.getToken();
      return await this.irrigationSystemRepository.newIrrigationSystem(params, token);
    } catch (error) {
      console.log("CHORA SYSTEM NEW")
      const {
        response: { status },
      } = error;
      switch (status) {
        case STATUS_CODE.UNAUTHORIZED:
          throw new UserUnauthorized();
        default:
          throw new UnexpectedError();
      }
    }
  }

  async getSystems(): Promise<any> {
    try {
      console.log("ENTREI PAPAI SYSTEM")
      const { token } = await this.authRepository.getToken();
      return await this.irrigationSystemRepository.getSystems(token);
    } catch (error) {
      console.log("CHORAAA SYSTEM")
      console.log(error)
    }
  }

  async deleteSystem(params: number): Promise<any> {
    try {
      const { token } = await this.authRepository.getToken();
      return await this.irrigationSystemRepository.deleteSystem(params, token);
    } catch (error) {
      console.log(error)
    }
  }
}
