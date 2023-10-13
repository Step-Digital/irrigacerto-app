import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { strings } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";

import * as S from "./styles";

interface HeaderProps {
  minHeader: boolean;
  minTitle?: string;
  action?: () => void;
  isFinalStep?: boolean;
}

export const Header = ({
  minHeader,
  minTitle,
  action,
  isFinalStep,
}: HeaderProps) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <S.Container minHeader={minHeader}>
      <S.HeaderContainer minHeader={minHeader}>
        {!minHeader ? (
          <>
            <S.DropDownButton onPress={() => navigation.navigate("Menu")}>
              <MaterialIcons name="menu" size={26} color="#fff" />
            </S.DropDownButton>
            <S.ProfileButton>
              <Ionicons
                name="person-outline"
                size={20}
                color="#fff"
                onPress={() => navigation.navigate("Profile")}
              />
            </S.ProfileButton>
          </>
        ) : (
          <>
            <S.BackButton onPress={action}>
              {!isFinalStep && (
                <AntDesign name="arrowleft" size={24} color="#fff" />
              )}
            </S.BackButton>
            <S.MinTitle>{minTitle}</S.MinTitle>
            <S.CloseButton onPress={() => navigation.navigate("HomeLogged")}>
              {!isFinalStep && (
                <AntDesign name="close" size={24} color="#fff" />
              )}
            </S.CloseButton>
          </>
        )}
      </S.HeaderContainer>
      {!minHeader && <S.Title>{strings.header.title}</S.Title>}
    </S.Container>
  );
};
