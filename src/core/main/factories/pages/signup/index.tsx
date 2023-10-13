import { SignupScreen } from "../../../../../ui/pages/signup"
import { makeRemoteAuth } from "../../usecases/auth"

export const MakeSignup = () => {
  return <SignupScreen auth={makeRemoteAuth()} />
}