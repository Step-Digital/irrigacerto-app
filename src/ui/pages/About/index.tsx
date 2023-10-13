import React from "react";
import { Header } from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { strings } from "../../../utils";
import { Image } from "expo-image";

import * as S from "./styles";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { Typography } from "../../components/typography";
import { StyleSheet } from "react-native";

export const About: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <S.Container>
      <Header
        minHeader
        minTitle={strings.about.header}
        action={() => navigation.navigate("HomeLogged")}
      />
      <S.Content>
        <Typography
          style={{
            fontFamily: "Poppins-bold",
            fontSize: 22,
          }}
          color="positive"
          size="normal"
          weight="regular"
        >
          {strings.about.title}
        </Typography>
        <Typography
          style={{
            marginTop: 24,
            fontFamily: "Poppins-regular",
            fontSize: 14,
          }}
          color="gray-7"
          size="normal"
          weight="regular"
        >
          {strings.about.about}
        </Typography>
        <Typography
          style={{
            marginTop: 24,
            fontFamily: "Poppins-bold",
            fontSize: 14,
          }}
          color="gray-7"
          size="normal"
          weight="regular"
        >
          {strings.about.namesTitle}
        </Typography>

        <S.ImagesContainer>
          <Typography
            style={{
              fontFamily: "Poppins-regular",
              fontSize: 14,
              textDecorationLine: 'underline'
            }}
            color="gray-7"
            size="normal"
            weight="regular"
          >
            {strings.about.footer}
          </Typography>
          <Image
            style={{ width: 319, height: 89 }}
            source={require("../../../../assets/sponsors1.png")}
            placeholder={"Sponsors"}
            contentFit="fill"
            transition={1000}
          />
          <Image
            style={{ width: 232, height: 57, marginTop: 21 }}
            source={require("../../../../assets/sponsors2.png")}
            placeholder={"Sponsors"}
            contentFit="fill"
            transition={1000}
          />
          <Image
            style={{ width: 181, height: 73, marginTop: 15 }}
            source={require("../../../../assets/sponsors3.png")}
            placeholder={"Sponsors"}
            contentFit="fill"
            transition={1000}
          />
        </S.ImagesContainer>
      </S.Content>
    </S.Container>
  );
};

const localStyles = StyleSheet.create({
  nameAppImage: {
    width: 200,
    height: 81,
  },
  logoImage: {
    width: 120,
    height: 140,
    position: "absolute",
    top: -60,
  },
  sponsorsImage: {
    width: "100%",
    height: 260,
  },
});
