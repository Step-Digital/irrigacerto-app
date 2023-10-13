import React from "react";
import { PropertyRegistered } from "../../../../../ui/pages/propertyRegistered";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteAuth } from "../../usecases/auth";

export const MakePropertyRegistered: React.FC = () => {
  return (
    <PropertyRegistered auth={makeRemoteAuth()} propertyService={makeRemoteNewProperty()} />
  )
}