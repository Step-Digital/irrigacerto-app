import React, { useEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import * as S from "./style";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Button } from "../../components/button";
import { Typography } from "../../components/typography";

import { strings } from "../../../utils";
import { FlashMessage } from "../../components/flash-message";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { CacheDomain } from "../../../core/domain/cache.domain";

type HomeProps = {
  auth: AuthDomain;
  cache: CacheDomain;
};

export const HomeScreen: React.FC<HomeProps> = ({ auth, cache }) => {
  const navigation = useNavigation<NavigationProps>();

  const autoLogin = useMutation({
    mutationFn: () => {
      return cache.get({ key: "@token" });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    autoLogin.mutate();
  }, []);

  return (
    <S.StyledView>
      <StatusBar
        backgroundColor="#00344A"
        translucent
        style={Platform.OS === "ios" ? "dark" : "light"}
      />
      <S.StyledHeader>
        <Image
          style={localStyles.nameAppImage}
          source={require("../../../../assets/white-new-logo.png")}
          placeholder={"asdas"}
          contentFit="contain"
          transition={1000}
        />
      </S.StyledHeader>
      <S.StyledContent>
        {autoLogin.isLoading && (
          <ActivityIndicator size={"large"} color={"#00344A"} />
        )}
        {!autoLogin.isLoading && (
          <>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 10,
              }}
            >
              <Image
                style={localStyles.sponsorsImage}
                source={require("../../../../assets/sponsors.png")}
                placeholder={"Sponsors"}
                contentFit="fill"
                transition={1000}
              />
            </View>
            <S.StyledActions>
              <Button
                bg-color="positive"
                onPress={() => navigation.navigate("Signup")}
              >
                <Typography color="pure-white" size="large" weight="bold">
                  {strings.userNotLoggedIn.createAccount}
                </Typography>
              </Button>
              <Button
                bg-color="transparent"
                onPress={() => navigation.navigate("Login")}
              >
                <Typography color="neutral-4" size="large" weight="bold">
                  {strings.userNotLoggedIn.haveRegistration}
                </Typography>
              </Button>
            </S.StyledActions>
          </>
        )}
      </S.StyledContent>
      {autoLogin.isError && (
        <FlashMessage
          title="Efetue o login para acessar o sistema"
          show
          duration={3000}
        />
      )}
    </S.StyledView>
  );
};

const localStyles = StyleSheet.create({
  nameAppImage: {
    width: 200,
    height: 91,
  },
  logoImage: {
    width: 120,
    height: 140,
    position: "absolute",
    top: -60,
  },
  sponsorsImage: {
    width: "100%",
    height: 200,
  },
});
