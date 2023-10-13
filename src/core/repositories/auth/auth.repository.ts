import { AuthDomain } from "../../domain/auth.domain";

import { LoginDTO, RequestPasswordResetDTO, SignupDTO } from "../../dtos/auth";
import { GetTokenModel, LoginModel, SignupModel } from "../../models/auth";
import { AxiosInstance } from "axios";
import { RequestPasswordResetModel } from "../../models/auth/request-password-reset.model";
import { ResetPasswordDTO } from "../../dtos/auth/reset-password.dto";
import { CacheRepository } from "../cache/cache.repository";

export class AuthRepository implements AuthDomain {
  constructor(
    private readonly httpClient: AxiosInstance,
    private readonly cacheRepository: CacheRepository
  ) {}

  async getToken(): Promise<GetTokenModel> {
    const token = await this.cacheRepository.get<{
      accessToken: string,
    }>({ key: "@token" });

    if(token !== undefined) {
      return {
        token: token.accessToken
      }
    }

    return {
      token: null
    }
  }
  async login(params: LoginDTO): Promise<LoginModel> {
    const {
      data: { data },
    } = await this.httpClient.post<LoginModel>("/auth/login", {
      email: params.email,
      password: params.password,
    });
    return {
      data,
    };
  }

  async requestPasswordReset(params: RequestPasswordResetDTO): Promise<any> {
    const { data } = await this.httpClient.post<any>(
      "/auth/request-password-reset",
      params
    );

    return {
      data,
    };
  }

  async signup(params: SignupDTO): Promise<SignupModel> {
    const {
      data: { data },
    } = await this.httpClient.post<SignupModel>("/auth/signup", params);
    return {
      data,
    };
  }

  async resetPassword(params: RequestPasswordResetDTO): Promise<any> {
    const { data } = await this.httpClient.post(
      "/auth/request-password-reset",
      params
    );
    return {
      data,
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
