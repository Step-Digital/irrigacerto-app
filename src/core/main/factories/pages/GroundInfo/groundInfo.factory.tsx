import React from "react";
import { GroundInfo } from "../../../../../ui/pages/GroundInfo";
import { makeRemoteGround } from "../../usecases/ground";
import { makeRemoteCache } from "../../usecases/cache";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteNewProperty } from "../../usecases/newProperty";

export const MakeGroundInfo: React.FC = () => {
  return (
    <GroundInfo auth={makeRemoteAuth()} propertyService={makeRemoteNewProperty()} groundService={makeRemoteGround()} cache={makeRemoteCache()} />
  )
}