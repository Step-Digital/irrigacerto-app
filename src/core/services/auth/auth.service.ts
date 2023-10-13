import { STATUS_CODE } from "../../../utils";
import { UserUnauthorized, UnexpectedError } from "./errors";

import { LoginDTO, RequestPasswordResetDTO, SignupDTO } from "../../dtos/auth";
import { GetTokenModel, LoginModel, SignupModel } from "../../models/auth";

import { AuthDomain } from "../../domain/auth.domain";
import { AuthRepository } from "../../repositories/auth/auth.repository";
import { RequestPasswordResetModel } from "../../models/auth/request-password-reset.model";

export class AuthService implements AuthDomain {
  constructor(private readonly authRepository: AuthRepository) {}
  async getToken (): Promise<GetTokenModel> {
    return await this.authRepository.getToken();
  }

  async login(params: LoginDTO): Promise<LoginModel> {
    try {
      return await this.authRepository.login(params);
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
  async requestPasswordReset(params: RequestPasswordResetDTO): Promise<any> {
    try {
      return await this.authRepository.requestPasswordReset(params);
    } catch (error) {
      return error;
    }
  }

  async signup(params: SignupDTO): Promise<SignupModel> {
    try {
      console.log('ENTREI SIGNUP PAPAI')
      return await this.authRepository.signup(params);
    } catch (error) {
      console.log('CHORA SIGNUP PAPAI')
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

  async resetPassword(params: SignupDTO): Promise<SignupModel> {
    return {
      data: {
        accessToken: "",
        refreshToken: "",
      },
    };
  }

  async logout(params: SignupDTO): Promise<SignupModel> {
    return {
      data: {
        accessToken: "",
        refreshToken: "",
      },
    };
  }
}
