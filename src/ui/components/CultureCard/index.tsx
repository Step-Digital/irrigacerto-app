import React, { useState } from "react";
import { Text } from "react-native";
import { Image } from "expo-image";
import { Tooltip, TooltipProps } from "@rneui/themed";
import { strings } from "../../../utils";

import * as S from "./style";
import { Typography } from "../typography";

interface CultureCardProps {
  image: string;
  cultureTitle: string;
  plantingDate: string;
  stage: string;
  sector: string;
  precipitation: string;
  groundStatus: string;
  irrigationValue: string;
  irrigationValueTotal: string;
  getCulture: () => void;
}

const ControlledTooltip: React.FC<TooltipProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

export const CultureCard: React.FC = ({
  image,
  cultureTitle,
  plantingDate,
  stage,
  sector,
  precipitation,
  groundStatus,
  irrigationValue,
  irrigationValueTotal,
  getCulture
}: CultureCardProps) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <S.Container>
      <S.MainInfoContainer>
        <Image
          source={image}
          transition={300}
          style={{
            width: 90,
            height: 90,
            display: "flex",
            borderRadius: 500,
          }}
          contentFit="cover"
        />
        <S.TextContainer>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-bold",
              fontSize: 17,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            {cultureTitle}
          </Typography>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-regular",
              fontSize: 14,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            Plantio: {plantingDate}
          </Typography>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-regular",
              fontSize: 14,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            Estágio: {stage}
          </Typography>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-regular",
              fontSize: 14,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            Setor: {sector}
          </Typography>
        </S.TextContainer>
        <S.ActionsButton onPress={() => setOpenEdit(!openEdit)}>
          <Image
            source={require("../../../../assets/dots.png")}
            transition={300}
            style={{
              width: 21,
              height: 21,
              marginBottom: 4,
              marginLeft: 4,
            }}
            contentFit="cover"
          />
        </S.ActionsButton>
        {openEdit && (
          <S.EditContainer onPress={() => getCulture()}>
            <Image
              source={require("../../../../assets/edit.png")}
              transition={300}
              style={{
                width: 21,
                height: 21,
                display: "flex",
                borderRadius: 500,
              }}
              contentFit="cover"
            />
              <Typography
                style={{
                  textAlign: "left",
                  fontFamily: "Poppins-regular",
                  fontSize: 12,
                  marginLeft: 8,
                }}
                color="gray-5"
                size="normal"
                weight="medium"
              >
                Editar
              </Typography>
          </S.EditContainer>
        )}
      </S.MainInfoContainer>
      <S.StatusContainer>
        <S.PrecipitationContainer>
          <S.PrecipitationTextContainer>
            <Typography
              style={{
                textAlign: "left",
                fontFamily: "Poppins-bold",
                fontSize: 14,
              }}
              color="gray-7"
              size="normal"
              weight="medium"
            >
              Precipitação (mm)
            </Typography>
            <ControlledTooltip
              popover={
                <Text
                  style={{ fontFamily: "Poppins-regular", color: "#00344A" }}
                >
                  {strings.homeLogged.info}
                </Text>
              }
              width={264}
              height={147}
              backgroundColor="#DAF4E1"
            >
              <Image
                source={require("../../../../assets/info.png")}
                transition={1000}
                style={{
                  width: 21,
                  height: 21,
                  marginBottom: 4,
                  marginLeft: 4,
                }}
                contentFit="cover"
              />
            </ControlledTooltip>
          </S.PrecipitationTextContainer>
          <S.PrecipitationTextContainer>
            <S.MinusButton>
              <Image
                source={require("../../../../assets/minus.png")}
                transition={1000}
                style={{
                  width: 26,
                  height: 26,
                  marginBottom: 4,
                  marginLeft: 4,
                }}
                contentFit="cover"
              />
            </S.MinusButton>
            <Typography
              style={{
                textAlign: "left",
                fontFamily: "Poppins-regular",
                fontSize: 14,
                marginHorizontal: 8,
              }}
              color="gray-7"
              size="normal"
              weight="medium"
            >
              {precipitation}
            </Typography>
            <S.PlusButton>
              <Image
                source={require("../../../../assets/plus.png")}
                transition={1000}
                style={{
                  width: 26,
                  height: 26,
                  marginBottom: 4,
                  marginLeft: 4,
                }}
                contentFit="cover"
              />
            </S.PlusButton>
          </S.PrecipitationTextContainer>
        </S.PrecipitationContainer>
        <S.StatusGroundContainer>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-bold",
              fontSize: 14,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            Status do Solo:
          </Typography>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-bold",
              fontSize: 16,
              marginTop: 10,
            }}
            color="negative"
            size="normal"
            weight="medium"
          >
            {groundStatus}
          </Typography>
        </S.StatusGroundContainer>
      </S.StatusContainer>
      <S.FooterContainer>
        <S.FooterCard>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-bold",
              fontSize: 16,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            Irrigação setor:
          </Typography>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-bold",
              fontSize: 16,
              marginTop: 8,
            }}
            color="neutral-1"
            size="normal"
            weight="medium"
          >
            {irrigationValue}
          </Typography>
        </S.FooterCard>
        <S.FooterCard>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-bold",
              fontSize: 16,
            }}
            color="gray-7"
            size="normal"
            weight="medium"
          >
            Para área total:
          </Typography>
          <Typography
            style={{
              textAlign: "left",
              fontFamily: "Poppins-bold",
              fontSize: 16,
              marginTop: 8,
            }}
            color="neutral-1"
            size="normal"
            weight="medium"
          >
            {irrigationValueTotal}
          </Typography>
        </S.FooterCard>
      </S.FooterContainer>
    </S.Container>
  );
};
