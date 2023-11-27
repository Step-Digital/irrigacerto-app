import React, { useEffect } from "react";
import "core-js/stable/atob";
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { API } from "../../../core/services/axios.service";



type HomeProps = {
  auth: AuthDomain;
  cache: CacheDomain;
};

export const HomeScreen: React.FC<HomeProps> = ({ auth, cache }) => {
  const navigation = useNavigation<NavigationProps>();

  // const autoLogin = useMutation({
  //   mutationFn: () => {
  //     return cache.get({ key: "@token" });
  //   },
  //   onSuccess: (data) => {
  //     if (data !== null) {
  //       return navigation.navigate("HomeLogged");
  //     }
  //   },
  // });

  // useEffect(() => {
  //   autoLogin.mutate();
  // }, []);

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

  useEffect(() => {
    AsyncStorage.getItem("@token").then((token) => {
      (async () => {        
        const accessToken = JSON.parse(token).refreshToken
        console.log(accessToken)
        await API.post("/auth/refresh", {
          refreshToken: JSON.parse(token).refreshToken
        }).then((newToken) => {
          AsyncStorage.setItem("@token", JSON.stringify(newToken));
          return navigation.navigate("HomeLogged");
        });
      })()
    }).catch((error) => {
      return navigation.navigate("Home");
    })
  }, [])

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
          source={require("../../../../assets/newlogo-white.png")}
          placeholder={"asdas"}
          contentFit="contain"
          transition={1000}
        />
      </S.StyledHeader>
      <S.StyledContent>
        {/* {autoLogin.isLoading && (
          <ActivityIndicator size={"large"} color={"#00344A"} />
        )} */}
        {/* {!autoLogin.isLoading && ( */}
        <>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Image
              style={localStyles.sponsorsImage}
              source={require("../../../../assets/sponsors.png")}
              placeholder={"Sponsors"}
              contentFit="fill"
              transition={1000}
            />
            <Typography color="gray-8" size="small" weight="regular" style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>
              Desenvolvido por
            </Typography>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

              <Image
                source={require("../../../../assets/Incaper.png")}
                contentFit="contain"
                transition={1000}
                style={{
                  width: 100,
                  height: 40,
                  
                }}
                />
                </View>
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
        {/* )} */}
      </S.StyledContent>
      {/* {autoLogin.isError && (
        <FlashMessage
          title="Efetue o login para acessar o sistema"
          show
          duration={3000}
        />
      )} */}
    </S.StyledView>
  );
};

const localStyles = StyleSheet.create({
  nameAppImage: {
    width: 280,
    height: 141,
  },
  logoImage: {
    width: 120,
    height: 140,
    position: "absolute",
    top: -60,
  },
  sponsorsImage: {
    width: "100%",
    height: 280,
  },
});
