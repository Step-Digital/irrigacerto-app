import React from "react";
import { Profile } from "../../../../../ui/pages/Profile";
import { makeRemoteAuth } from "../../usecases/auth";
import { makeRemoteNewProperty } from "../../usecases/newProperty";

export const MakeProfile: React.FC = () => {
  return (
    <Profile auth={makeRemoteAuth()} propertyService={makeRemoteNewProperty()} />
  )
}