import React from "react";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import { strings } from "../../../utils";
import { NavigationProps } from "../../routes/types/StackNavigationProps";

import { Header } from "../../components/Header";
import { Typography } from "../../components/typography";

import * as S from './style';
import { Button } from "../../components/button";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { useQuery } from "@tanstack/react-query";

type PropertyRegisteredProps = {
  auth: AuthDomain;
  propertyService: NewPropertyDomain;
};

export const PropertyRegistered: React.FC<PropertyRegisteredProps> = ({ auth, propertyService}) => {
  const navigation = useNavigation<NavigationProps>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["AllProperties"],
    queryFn: () => propertyService.getAllPropertiesData(),
  });

  const onSubmit = () => {
    refetch()
    navigation.navigate('HomeLogged')
  }

  return (
    <S.Container>
      <Header 
        minHeader 
        minTitle={strings.propertyRegistered.title} 
        isFinalStep
      />
      <S.Content>
      <Typography
        style={{
          fontFamily: 'Poppins-bold',
          fontSize: 22,
        }}
        color="neutral-4"
        size="normal"
        weight="regular"
        >
        {strings.propertyRegistered.subTitle}
      </Typography>
      <S.ImageContent>
      <Image
        source={require("../../../../assets/propertyRegistered.png")}
        transition={1000}
        style={{
          width: 273,
          height: 191,
        }}
        contentFit="cover"
        />
      <Image
        source={require("../../../../assets/greenCheck.png")}
        transition={1000}
        style={{
          width: 79,
          height: 79,
          position: "absolute",
          left: 16,
          top: -10
        }}
        contentFit="cover"
        />
      </S.ImageContent>
      <S.TextContainer>
      <Typography
        style={{
          marginTop: 24,
          fontFamily: 'Poppins-bold',
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 17.5
        }}
        color="neutral-4"
        size="normal"
        weight="regular"
        >
        {strings.propertyRegistered.content.text1} 
      </Typography>
      <Typography
        style={{
          fontFamily: 'Poppins-regular',
          fontSize: 14,
          textAlign: 'center',
          width: 360,
          lineHeight: 17.5
        }}
        color="gray-7"
        size="normal"
        weight="regular"
        >
        {strings.propertyRegistered.content.text2} 
        <Typography
        style={{
          fontFamily: 'Poppins-bold',
          fontSize: 14,
          textAlign: 'center',
          width: 360,
        }}
        color="neutral-4"
        size="normal"
        weight="regular"
        >
        {strings.propertyRegistered.content.text3}
        <Typography
        style={{
          fontFamily: 'Poppins-regular',
          fontSize: 14,
          textAlign: 'center',
          width: 360,
        }}
        color="gray-7"
        size="normal"
        weight="regular"
        >
        {strings.propertyRegistered.content.text4}
      </Typography>
      </Typography>
      </Typography>
      </S.TextContainer>
      <S.TextContainer>
      <Typography
        style={{
          marginTop: 12,
          fontFamily: 'Poppins-regular',
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 17.5,
        }}
        color="gray-7"
        size="normal"
        weight="regular"
        >
        {strings.propertyRegistered.content.text5} 
      </Typography>
      <Typography
        style={{
          fontFamily: 'Poppins-bold',
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 17.5,
        }}
        color="positive"
        size="normal"
        weight="regular"
        >
        {strings.propertyRegistered.content.text6} 
        <Typography
          style={{
            fontFamily: 'Poppins-regular',
            fontSize: 14,
            textAlign: 'center',
            lineHeight: 17.5,
          }}
          color="gray-7"
          size="normal"
          weight="regular"
          >
        {strings.propertyRegistered.content.text7} 
        </Typography>
      </Typography>
      </S.TextContainer>
      <S.registerCultureButton
        onPress={() => navigation.navigate('CultureInfo')}
      >
      <Typography
        style={{
          fontFamily: 'Poppins-bold',
          fontSize: 14,
          textAlign: 'center',
          textDecorationLine: 'underline'
        }}
        color="positive"
        size="normal"
        weight="regular"
        >
          {strings.propertyRegistered.regiterCulture}
        </Typography>
      </S.registerCultureButton>
      <Button 
        onPress={() => onSubmit()}
        bg-color="neutral-4" 
        style={{ marginTop: 8}} 
      >
      <Typography
        style={{
          fontFamily: 'Poppins-bold',
          fontSize: 14,
          textAlign: 'center',
        }}
        color="pure-white"
        size="normal"
        weight="regular"
        >
          {strings.propertyRegistered.goBack}
        </Typography>
      </Button>
      </S.Content>
    </S.Container>
  )
}