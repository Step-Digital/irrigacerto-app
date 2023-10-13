import React from "react";
import { Menu } from "../../../../../ui/pages/Menu";
import { makeRemoteAuth } from "../../usecases/auth";

export const MakeMenu: React.FC = () => {
  return (
    <Menu auth={makeRemoteAuth()} />
  )
}