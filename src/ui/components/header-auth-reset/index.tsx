import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Icon from "@expo/vector-icons/Feather";
import { Button } from "../button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { Typography } from "../typography";

import * as S from './styles'

export const HeaderAuthReset: React.FC<{
  hiddenBackButton?: boolean;
  isLogin?: boolean;
}> = ({ hiddenBackButton, isLogin }) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <S.Container>
      {!hiddenBackButton && (
        <Button
          bg-color="transparent"
          onPress={() => navigation.navigate("Home")}
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography
            color="pure-white"
            size="normal"
            weight="bold"
            style={{
              paddingHorizontal: 16,
              marginTop: 30,
            }}
          >
            <Icon name="arrow-left" size={24} />
          </Typography>
        </Button>
      )}
      <S.ContainerImg>
        <Image
          source={require("../../../../assets/newlogo-white.png")}
          contentFit="contain"
          transition={1000}
          style={{
            width: 300,
            height: 200,
          }}
        />
      </S.ContainerImg>
    </S.Container>
  );
};
