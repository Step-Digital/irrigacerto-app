import React from "react";
import { SystemInfo } from "../../../../../ui/pages/SystemInfo";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteCache } from "../../usecases/cache";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteIrrigationSystem } from "../../usecases/irrigationSystem";

export const MakeSystemInfo: React.FC = () => {
  return (
    <SystemInfo auth={makeRemoteAuth()} irrigationSystemService={makeRemoteIrrigationSystem()} propertyService={makeRemoteNewProperty()} cache={makeRemoteCache()} />
  )
}