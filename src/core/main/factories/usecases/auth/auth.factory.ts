import { AuthDomain } from "../../../../domain/auth.domain";
import { AuthRepository } from "../../../../repositories/auth";
import { AuthService } from "../../../../services/auth";
import { API } from "../../../../services/axios.service";

export const makeRemoteAuth = (): AuthDomain => {
  return new AuthService(new AuthRepository(API));
}