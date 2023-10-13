import { STATUS_CODE } from "../../../utils";
import { UserUnauthorized, UnexpectedError } from "../auth/errors";

import {
  NewBombDTO,
} from "../../dtos/newProperty";

import { BombDomain } from "../../domain/bomb.domain";
import { BombRepository } from "../../repositories/bomb/bomb.repository";
import { AuthRepository } from "../../repositories/auth";

export class BombService implements BombDomain {
  constructor(
    private readonly bombRepository: BombRepository,
    private readonly authRepository: AuthRepository
  ) {}

  async newBomb(params: NewBombDTO): Promise<any> {
    try {
      console.log("ENTREI BOMB NEW")
      const { token } = await this.authRepository.getToken();
      return await this.bombRepository.newBomb(params, token);
    } catch (error) {
      console.log("CHORA BOMB NEW")
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

  async getBombs(): Promise<any> {
    try {
      console.log("ENTREI PAPAI BOMB")
      const { token } = await this.authRepository.getToken();
      return await this.bombRepository.getBombs(token);
    } catch (error) {
      console.log("CHORAAA BOMB")
      console.log(error)
    }
  }

  async deleteBomb (params: number): Promise<any> {
    try {
      const { token } = await this.authRepository.getToken();
      return await this.bombRepository.deleteBomb(params, token);
    } catch (error) {
      console.log(error)
    }
  }
}
