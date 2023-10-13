import { STATUS_CODE } from "../../../utils";
import { UserUnauthorized, UnexpectedError } from "../auth/errors";

import {
  NewGroundDTO,
} from "../../dtos/newProperty";

import { GroundDomain } from "../../domain/ground.domain";
import { GroundRepository } from "../../repositories/ground/ground.repository";
import { AuthRepository } from "../../repositories/auth";

export class GroundService implements GroundDomain {
  constructor(
    private readonly groundRepository: GroundRepository,
    private readonly authRepository: AuthRepository
  ) {}

  async newGround(params: NewGroundDTO): Promise<any> {
    try {
      const { token } = await this.authRepository.getToken();
      return await this.groundRepository.newGround(params, token);
    } catch (error) {
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

  async getGrounds (): Promise<any> {
    try {
      console.log("ENTREI PAPAI GROUNDS")
      const { token } = await this.authRepository.getToken();
      return await this.groundRepository.getGrounds(token);
    } catch (error) {
      console.log("CHORA GROUNDS")
      console.log(error)
    }
  }

  async deleteGround (params: number): Promise<any> {
    try {
      const { token } = await this.authRepository.getToken();
      return await this.groundRepository.deleteGround(params, token);
    } catch (error) {
      console.log(error)
    }
  }

  async editGround (params: any, id: number): Promise<any> {
    try {
      console.log("ENTREI PAPAI EDIT GROUNDS")
      const { token } = await this.authRepository.getToken();
      return await this.groundRepository.editGround(params, id, token);
    } catch (error) {
      console.log("CHORA PAPAI EDIT GROUNDS")
      console.log(error)
    }
  }
}
