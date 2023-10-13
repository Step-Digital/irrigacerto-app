import React from "react";
import { BombInfo } from "../../../../../ui/pages/BombInfo";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteCache } from "../../usecases/cache";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteBomb } from "../../usecases/bomb";

export const MakeBombInfo: React.FC = () => {
  return (
    <BombInfo auth={makeRemoteAuth()} bombService={makeRemoteBomb()} propertyService={makeRemoteNewProperty()} cache={makeRemoteCache()} />
  )
}