import React, { useState } from "react";
import { Text } from "react-native";
import { Image } from "expo-image";
import { Tooltip, TooltipProps } from "@rneui/themed";
import { strings } from "../../../utils";

import * as S from "./style";
import { Typography } from "../typography";
import { Button } from "../button";

interface CultureCardProps {
  image: string;
  cultureTitle: string;
  plantingDate: string;
  dimension: string;
  city: string;
  state: string;
  grounds: string;
  bombs: string;
  systems: string;
  action: () => {}
}

export const PropertyCard: React.FC = ({
  image,
  cultureTitle,
  state,
  dimension,
  city,
  grounds,
  bombs,
  systems,
  action
}: CultureCardProps) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <S.Container>
      <S.MainInfoContainer>
        <Image
          source={image}
          transition={300}
          style={{
            width: 80,
            height: 80,
            display: "flex",
            marginLeft: 8
          }}
          contentFit="cover"
        />
        <S.TextContainer>
          <Typography
            style={{
              fontFamily: "Poppins-bold",
              fontSize: 14,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            {cultureTitle}
          </Typography>
          <Typography
            style={{
              fontFamily: "Poppins-regular",
              fontSize: 14,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            {dimension} ha
          </Typography>
          <Typography
            style={{
              fontFamily: "Poppins-regular",
              fontSize: 14,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            {city} - {state}
          </Typography>
        </S.TextContainer>
      </S.MainInfoContainer>
      <Typography
        style={{
          textAlign: "left",
          fontFamily: "Poppins-bold",
          fontSize: 14,
          marginLeft: 8,
          marginTop: 8
        }}
        color="positive"
        size="normal"
        weight="medium"
      >
        Número de Solos ({grounds})
      </Typography>
      <Typography
        style={{
          textAlign: "left",
          fontFamily: "Poppins-bold",
          fontSize: 14,
          marginLeft: 8,
          marginTop: 8,
        }}
        color="positive"
        size="normal"
        weight="medium"
      >
        Número de Motobomba ({bombs})
      </Typography>
      <Typography
        style={{
          textAlign: "left",
          fontFamily: "Poppins-bold",
          fontSize: 14,
          marginLeft: 8,
          marginTop: 8,
        }}
        color="positive"
        size="normal"
        weight="medium"
      >
        Número de Sistemas de irrigação ({systems})
      </Typography>
      <Button
        bg-color="positive"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 16,
        }}
        onPress={() => action()}
      >
        <Typography
          style={{
            fontFamily: "Poppins-regular",
            fontSize: 16,
          }}
          color="pure-white"
          size="normal"
          weight="bold"
        >
          Detalhes
        </Typography>
      </Button>
    </S.Container>
  );
};
