import React from "react";
import { CultureRegistered } from "../../../../../ui/pages/CultureRegistered";
import { makeRemoteNewProperty } from "../../usecases/newProperty";
import { makeRemoteAuth } from "../../usecases/auth";

export const MakeCultureRegistered: React.FC = () => {
  return (
    <CultureRegistered auth={makeRemoteAuth()} propertyService={makeRemoteNewProperty()} />
  )
}