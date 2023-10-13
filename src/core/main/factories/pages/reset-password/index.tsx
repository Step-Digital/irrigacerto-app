import React from "react"
import { ResetPasswordScreen } from "../../../../../ui/pages/reset-password"
import { makeRemoteAuth } from "../../usecases/auth"

export const MakeResetPassword: React.FC = () => {
  return <ResetPasswordScreen auth={makeRemoteAuth()} />
}