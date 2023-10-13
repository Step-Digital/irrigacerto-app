import React from 'react';
import { Image } from "expo-image";
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

import { strings } from '../../../utils';
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";

import * as S from './style';
import { Typography } from '../../components/typography';
import { AuthDomain } from '../../../core/domain/auth.domain';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type MenuProps = {
  auth: AuthDomain;
};

export const  Menu: React.FC = ({ auth }: MenuProps) => {
  const navigation = useNavigation<NavigationProps>();

  const logout = useMutation<AxiosError>({
    mutationFn: () => auth.logout({}),
    onSuccess: () => navigation.navigate('Home'),
  });

  return (
    <S.Container>
      <S.CloseContainer>
        <S.CloseButton onPress={() => navigation.navigate('HomeLogged')}>
          <AntDesign name="close" size={24} color="#fff" />
        </S.CloseButton>
      </S.CloseContainer>
      <S.logoContainer>
      <Image
        source={require("../../../../assets/white-new-logo.png")}
        transition={1000}
        style={{
          width: 239,
          height: 96,
          marginTop: 16,
          display: 'flex',
        }}
        contentFit="cover"
      />
      </S.logoContainer>
      <S.MenuContainer>
        <S.MenuOptionContainer onPress={() => navigation.navigate('HomeLogged')}>
          <SimpleLineIcons name="home" size={16} color="white" />
          <Typography
              style={{
                fontFamily: 'Poppins-regular',
                fontSize: 20,
                marginLeft: 8,
                marginTop: 8
              }}
              color="pure-white"
              size="normal"
              weight="medium"
            >
              {strings.menu.recomendations}
            </Typography>
        </S.MenuOptionContainer>
        <S.MenuOptionContainer onPress={() => navigation.navigate('Properties')}>
        <Image
          source={require("../../../../assets/Regular.png")}
          style={{
            width: 20,
            height: 20,
          }}
        />
         <Typography
            style={{
              fontFamily: 'Poppins-regular',
              fontSize: 20,
              marginLeft: 8,
              marginTop: 8
            }}
            color="pure-white"
            size="normal"
            weight="medium"
          >
            {strings.menu.myProperties}
          </Typography>
        </S.MenuOptionContainer>
        <S.MenuOptionContainer onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={16} color="white" />
          <Typography
            style={{
              fontFamily: 'Poppins-regular',
              fontSize: 20,
              marginLeft: 8,
              marginTop: 8
            }}
            color="pure-white"
            size="normal"
            weight="medium"
          >
            {strings.menu.profile}
          </Typography>
        </S.MenuOptionContainer>
        <S.MenuOptionContainer onPress={() => navigation.navigate('About')} >
          <FontAwesome5 name="building" size={16} color="white" />
          <Typography
              style={{
                fontFamily: 'Poppins-regular',
                fontSize: 20,
                marginLeft: 8,
                marginTop: 8
              }}
              color="pure-white"
              size="normal"
              weight="medium"
            >
              {strings.menu.about}
            </Typography>
        </S.MenuOptionContainer>
        <S.MenuOptionContainer onPress={() => logout.mutate()}>
          <AntDesign name="closecircleo" size={16} color="white" />
          <Typography
              style={{
                fontFamily: 'Poppins-regular',
                fontSize: 20,
                marginLeft: 8,
                marginTop: 8
              }}
              color="pure-white"
              size="normal"
              weight="medium"
            >
              {strings.menu.close}
            </Typography>
        </S.MenuOptionContainer>
      </S.MenuContainer>
    </S.Container>
  );
}