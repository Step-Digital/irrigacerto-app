import React from "react";
import { HomeScreen } from "../../../../../ui/pages/home";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteCache } from "../../usecases/cache";

export const MakeHome: React.FC = () => {
  return (
    <HomeScreen auth={makeRemoteAuth()} cache={makeRemoteCache()} />
  )
}