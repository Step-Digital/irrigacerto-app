import { STATUS_CODE } from "../../../utils";
import { UserUnauthorized, UnexpectedError } from "../auth/errors";

import {
  NewCultureDTO,
} from "../../dtos/culture";

import { CultureDataDomain } from "../../domain/cultureData.domain";
import { CultureDataRepository } from "../../repositories/cultureData";
import { AuthRepository } from "../../repositories/auth";

export class CultureDataService implements CultureDataDomain {
  constructor(
    private readonly cultureDataRepository: CultureDataRepository,
    private readonly authRepository: AuthRepository
  ) {}
  async getCulturesData(): Promise<any> {
    try {
      console.log("ENTREI PAPAI CULTURE")
      const { token } = await this.authRepository.getToken();
      return await this.cultureDataRepository.getCulturesData(token);
    } catch (error) {
      console.log("CHORAAA CULTURE")
      console.log(error)
    }
  }
}
