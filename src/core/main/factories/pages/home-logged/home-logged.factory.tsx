import React from "react";
import { HomeLogged } from "../../../../../ui/pages/home-logged";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteCache } from "../../usecases/cache";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteCulture } from "../../usecases/culture";
import { makeRemoteBomb } from "../../usecases/bomb";
import { makeRemoteGround } from "../../usecases/ground";
import { makeRemoteIrrigationSystem } from "../../usecases/irrigationSystem";

export const MakeHomeLogged: React.FC = () => {
  return (
    <HomeLogged
      auth={makeRemoteAuth()}
      bombService={makeRemoteBomb()}
      groundService={makeRemoteGround()}
      irrigationSystemService={makeRemoteIrrigationSystem()} 
      cultureService={makeRemoteCulture()}
      propertyService={makeRemoteNewProperty()}
      cache={makeRemoteCache()}
    />
  );
};
