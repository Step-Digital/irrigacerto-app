import { STATUS_CODE } from "../../../utils";
import { UserUnauthorized, UnexpectedError } from "../auth/errors";

import {
  NewCultureDTO,
} from "../../dtos/culture";

import { CultureDomain } from "../../domain/culture.domain";
import { CultureRepository } from "../../repositories/culture/culture.repository";
import { AuthRepository } from "../../repositories/auth";

export class CultureService implements CultureDomain {
  constructor(
    private readonly cultureRepository: CultureRepository,
    private readonly authRepository: AuthRepository
  ) {}

  async newCulture(params: NewCultureDTO): Promise<any> {
    try {
      console.log("ENTREI CULTURE NEW")
      const { token } = await this.authRepository.getToken();
      return await this.cultureRepository.newCulture(params, token);
    } catch (error) {
      console.log("CHORA CULTURE NEW")
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

  async getCultures(): Promise<any> {
    try {
      console.log("ENTREI PAPAI CULTURE")
      const { token } = await this.authRepository.getToken();
      return await this.cultureRepository.getCultures(token);
    } catch (error) {
      console.log("CHORAAA CULTURE")
      console.log(error)
    }
  }

  async getCulturesData(): Promise<any> {
    try {
      console.log("ENTREI PAPAI CULTURE")
      const { token } = await this.authRepository.getToken();
      return await this.cultureRepository.getCulturesData(token);
    } catch (error) {
      console.log("CHORAAA CULTURE")
      console.log(error)
    }
  }

  async deleteCulture(params: number): Promise<any> {
    try {
      const { token } = await this.authRepository.getToken();
      return await this.cultureRepository.deleteCulture(params, token);
    } catch (error) {
      console.log(error)
    }
  }

  async editCulture (params: any, id: number): Promise<any> {
    try {
      console.log("ENTREI PAPAI EDIT CULTURE")
      const { token } = await this.authRepository.getToken();
      return await this.cultureRepository.editCulture(params, id, token);
    } catch (error) {
      console.log("CHORA PAPAI EDIT CULTURE")
      console.log(error)
    }
  }
}
