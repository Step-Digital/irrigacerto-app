import React from "react";
import { NewPropertyScreen } from "../../../../../ui/pages/NewProperty";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteCache } from "../../usecases/cache";
import { makeRemoteAuth } from "../../usecases/auth";

export const MakeNewProperty: React.FC = () => {
  return (
    <NewPropertyScreen auth={makeRemoteAuth()} propertyService={makeRemoteNewProperty()} cache={makeRemoteCache()} />
  )
}