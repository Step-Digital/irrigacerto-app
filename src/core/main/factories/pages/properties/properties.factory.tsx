import React from "react";
import { Properties } from "../../../../../ui/pages/Properties";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteCache } from "../../usecases/cache";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteGround } from "../../usecases/ground";
import { makeRemoteBomb } from "../../usecases/bomb";
import { makeRemoteIrrigationSystem } from "../../usecases/irrigationSystem";

export const MakeProperties: React.FC = () => {
  return (
    <Properties
      auth={makeRemoteAuth()}
      groundService={makeRemoteGround()}
      propertyService={makeRemoteNewProperty()}
      bombService={makeRemoteBomb()}
      irrigationSystemService={makeRemoteIrrigationSystem()} 
      cache={makeRemoteCache()}
    />
  );
};
