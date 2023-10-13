import React from "react";
import { CultureInfo } from "../../../../../ui/pages/CultureInfo";
import { makeRemoteCache } from "../../usecases/cache";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteGround } from "../../usecases/ground";
import { makeRemoteCulture } from "../../usecases/culture";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteBomb } from "../../usecases/bomb";
import { makeRemoteIrrigationSystem } from "../../usecases/irrigationSystem";

export const MakeCulture: React.FC = () => {
  return (
    <CultureInfo auth={makeRemoteAuth()} irrigationSystemService={makeRemoteIrrigationSystem()}  bombService={makeRemoteBomb()} groundService={makeRemoteGround()} propertyService={makeRemoteNewProperty()} cultureService={makeRemoteCulture()} cache={makeRemoteCache()} />
  )
}