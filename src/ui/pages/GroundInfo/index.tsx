import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { CacheDomain } from "../../../core/domain/cache.domain";
import { GroundDomain } from "../../../core/domain/ground.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { strings } from "../../../utils";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { groundValidators } from "../../../utils/validators";
import { groundTypes } from "../../../utils/selectValues";

import { Typography } from "../../components/typography";
import { Input } from "../../components/input";
import { Header } from "../../components/Header";
import { ProgressBar } from "../../components/ProgressBar";
import { Button } from "../../components/button";
import { Select } from "../../components/SelectInput";

import * as S from "./style";
import { AuthDomain } from "../../../core/domain/auth.domain";

type GroundInfoProps = {
  auth: AuthDomain;
  cache: CacheDomain;
  groundService: GroundDomain;
  propertyService: NewPropertyDomain;
};

const inputStrings = strings.groundInfo.inputs;

export const GroundInfo: React.FC<GroundInfoProps> = ({
  groundService,
  propertyService,
}) => {
  const navigation = useNavigation<NavigationProps>();
  const [tipo_solo, setTipo_solo] = useState("");
  const [capacidade_campo, setCapacidade_campo] = useState("");
  const [ponto_murcha, setPonto_murcha] = useState("");
  const [densidade, setDensidade] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [cleanGround, setCleanGround] = useState(false);

  const cleanInputs = () => {
    setCleanGround(true);
    setCapacidade_campo("");
    setPonto_murcha("");
    setDensidade("");
  };

  const {
    data,
    isLoading,
    refetch: refresh,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getProperties(),
  });

  const {
    data: dataGround,
    isLoading: isLoadingGrounds,
    refetch,
  } = useQuery({
    queryKey: ["grounds"],
    queryFn: () => groundService.getGrounds(),
  });

  const validateValues = {
    tipo_solo,
    capacidade_campo,
    ponto_murcha,
    densidade,
  };

  const sumbitValues = {
    tipo_solo,
    capacidade_campo: Number(capacidade_campo),
    ponto_murcha: Number(ponto_murcha),
    densidade: Number(densidade),
  };

  async function validate() {
    try {
      await groundValidators.validate(validateValues);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors,
      });
      return false;
    }
  }

  const createGround = useMutation<AxiosError>({
    mutationFn: () =>
      groundService.newGround({
        ...sumbitValues,
        id_propriedade: data && data.data[data.data.length - 1].id_propriedade,
      }),
    onSuccess: () => {
      refetch();
      cleanInputs();
    },
  });

  const removeGround = useMutation<AxiosError>({
    mutationFn: (id) => groundService.deleteGround(Number(id)),
    mutationKey: ["grounds"],
    onSuccess: (data) => {
      refetch();
    },
  });

  const onSubmit = async () => {
    if (!(await validate())) {
      return Alert.alert(status.message[0]);
    } else {
      return createGround.mutate();
    }
  };

  useEffect(() => {
    validate();
    refresh();
  }, []);

  if (isLoading && isLoadingGrounds) return <Text>Carregando...</Text>;

  return (
    <S.Container>
      <Header
        minHeader
        minTitle="Nova Propriedade"
        action={() => navigation.navigate("NewProperty")}
      />
      <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
        <S.ProgressBarContainer>
          <ProgressBar active width="80px" />
          <ProgressBar active width="80px" />
          <ProgressBar active={false} width="80px" />
          <ProgressBar active={false} width="80px" />
        </S.ProgressBarContainer>
        <S.Content>
          <Typography
            style={{
              marginTop: 24,
              fontFamily: "Poppins-bold",
              fontSize: 22,
            }}
            color="positive"
            size="normal"
            weight="regular"
          >
            {strings.groundInfo.title}
          </Typography>
          <Select
            touchableText="Selecione..."
            title="State"
            objKey="id"
            objValue="name"
            data={groundTypes}
            label="Tipo de Solo"
            setValue={(value) => setTipo_solo(value)}
            setId={() => {}}
            clean={cleanGround}
            stateValue={undefined}
          />
          <Input
            label={inputStrings.capacity.label}
            placeholder={inputStrings.capacity.placeholder}
            value={capacidade_campo}
            onChangeText={(value) => setCapacidade_campo(value)}
            inputMode="numeric"
          />
          <Input
            label={inputStrings.point.label}
            placeholder={inputStrings.point.placeholder}
            value={ponto_murcha}
            onChangeText={(value) => setPonto_murcha(value)}
            inputMode="numeric"
          />
          <View>
            <Input
              label={inputStrings.density.label}
              placeholder={inputStrings.density.placeholder}
              value={densidade}
              onChangeText={(value) => setDensidade(value)}
              inputMode="numeric"
            />
          </View>

          <S.AddButton onPress={() => onSubmit()}>
            <Ionicons name="add" size={24} color="#fff" />
            <Typography
              style={{
                fontFamily: "Poppins-bold",
                fontSize: 12,
                marginLeft: 8,
                width: 100,
              }}
              color="pure-white"
              size="normal"
              weight="regular"
            >
              {strings.groundInfo.addButtonn}
            </Typography>
          </S.AddButton>

          {dataGround &&
            dataGround.data.map((item) => (
              <S.CardContainer key={item.id_solo}>
                <S.CardContent>
                  <S.InfoTitle>{item.tipo_solo}</S.InfoTitle>
                  <S.InfoText>
                    Capacidade de Campo:{" "}
                    <S.InfoTextBold>{item.capacidade_campo}%</S.InfoTextBold>
                  </S.InfoText>
                  <S.InfoText>
                    Ponto de Murcha:{" "}
                    <S.InfoTextBold>{item.ponto_murcha}%</S.InfoTextBold>
                  </S.InfoText>
                  <S.InfoText>
                    Densidade:{" "}
                    <S.InfoTextBold>{item.densidade}g/m²</S.InfoTextBold>
                  </S.InfoText>
                </S.CardContent>
                <TouchableOpacity
                  onPress={() => removeGround.mutate(item.id_solo)}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </S.CardContainer>
            ))}

          <Button
            onPress={() => {
              navigation.navigate("BombInfo");
            }}
            disabled={!dataGround}
            bg-color="positive"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 24,
              marginTop: 24,
              marginBottom: 24,
            }}
          >
            <Typography
              style={{
                fontFamily: "Poppins-regular",
                fontSize: 18,
                width: 180,
              }}
              color="pure-white"
              size="normal"
              weight="bold"
            >
              Continuar
            </Typography>
            <AntDesign name="arrowright" size={24} color="#fff" />
          </Button>
        </S.Content>
      </ScrollView>
    </S.Container>
  );
};
