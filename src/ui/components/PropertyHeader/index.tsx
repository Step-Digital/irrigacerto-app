import React from 'react'
import { Image } from "expo-image";
import { View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import * as S from './styles'
import { Typography } from '../typography';

export const PropertyHeader = ({ it, showProperties, setShowProperties, setPropertySelected }) => {
  return (
    <S.PropertyHeader
      key={Math.floor(Math.random() * Date.now())}
    >
      {it.cultura.length !== 0 &&
        (showProperties === it.id_propriedade ? (
          <S.OpenClosePorpertiesButton
            onPress={() => setShowProperties(null)}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../../../assets/farmGreen.png")}
                transition={1000}
                style={{
                  width: 21,
                  height: 21,
                  marginBottom: 4,
                  marginLeft: 4,
                }}
                contentFit="cover"
              />
              <Typography
                style={{
                  textAlign: "left",
                  fontFamily: "Poppins-regular",
                  fontSize: 18,
                  marginLeft: 8,
                }}
                color="neutral-4"
                size="normal"
                weight="medium"
              >
                {it.nome} &nbsp;
                <Typography
                  style={{
                    textAlign: "left",
                    fontFamily: "Poppins-regular",
                    fontSize: 18,
                  }}
                  color="gray-5"
                  size="normal"
                  weight="medium"
                >
                  ({it.cultura.length})
                </Typography>
              </Typography>
            </View>
            <MaterialIcons
              name="keyboard-arrow-up"
              size={32}
              color="#00344A"
            />
          </S.OpenClosePorpertiesButton>
        ) : (
          <S.OpenClosePorpertiesButton
            onPress={() => {
              setShowProperties(it.id_propriedade);
              setPropertySelected(it);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../../../assets/farmGreen.png")}
                transition={1000}
                style={{
                  width: 21,
                  height: 21,
                  marginBottom: 4,
                  marginLeft: 4,
                }}
                contentFit="cover"
              />
              <Typography
                style={{
                  textAlign: "left",
                  fontFamily: "Poppins-regular",
                  fontSize: 18,
                  marginLeft: 8,
                }}
                color="neutral-4"
                size="normal"
                weight="medium"
              >
                {it.nome} &nbsp;
                <Typography
                  style={{
                    textAlign: "left",
                    fontFamily: "Poppins-regular",
                    fontSize: 18,
                  }}
                  color="gray-5"
                  size="normal"
                  weight="medium"
                >
                  ({it.cultura.length})
                </Typography>
              </Typography>
            </View>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={32}
              color="#00344A"
            />
          </S.OpenClosePorpertiesButton>
        ))}
    </S.PropertyHeader>
  )
}