import { useMutation } from "@tanstack/react-query";
import { AuthDomain } from "../../core/domain/auth.domain";
import { LoginDTO } from "../../core/dtos/auth";

export const useAuth = (auth: AuthDomain) => {
  const login = {
    login: (params: LoginDTO) => useMutation({
      mutationFn: () => auth.login(params).catch((e) => e)
    }),
    isAuthenticated: () => "Passei aqui",
  }

  return {
    login
  }
}