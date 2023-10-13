import React from "react";
import { LoginScreen } from "../../../../../ui/pages/login";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteCache } from "../../usecases/cache";

export const MakeLogin: React.FC = () => {
  return <LoginScreen auth={makeRemoteAuth()} cache={makeRemoteCache()} />
}