import { LoginDTO, RequestPasswordResetDTO, SignupDTO } from "../dtos/auth";
import { LoginModel, SignupModel, RequestPasswordResetModel, GetTokenModel } from "../models/auth";

export interface AuthDomain {
  login: (params: LoginDTO) => Promise<LoginModel>;
  logout: (params: any) => Promise<any>;
  requestPasswordReset: (
    params: RequestPasswordResetDTO
  ) => Promise<any>;
  resetPassword: (params: any) => Promise<any>;
  signup: (params: SignupDTO) => Promise<SignupModel>;
  getToken: () => Promise<GetTokenModel>;
}
