import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Typography } from "../../components/typography";
import { Header } from "../../components/Header";
import { Image } from "expo-image";
import { strings } from "../../../utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import * as S from "./style";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { CacheDomain } from "../../../core/domain/cache.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { GroundDomain } from "../../../core/domain/ground.domain";
import { BombDomain } from "../../../core/domain/bomb.domain";
import { PropertyCard } from "../../components/PropertyCard";
import { Button } from "../../components/button";
import { AxiosError } from "axios";
import { Select } from "../../components/SelectInput";
import { Input } from "../../components/input";
import { groundTypes, irrigationTypeSelect } from "../../../utils/selectValues";
import {
  bombValidators,
  groundValidators,
  systemValidators,
} from "../../../utils/validators";
import { IrrigationSystemDomain } from "../../../core/domain/irrigationSystem.domain";

type PropertiesProps = {
  auth: AuthDomain;
  cache: CacheDomain;
  propertyService: NewPropertyDomain;
  groundService: GroundDomain;
  bombService: BombDomain;
  irrigationSystemService: IrrigationSystemDomain;
};

type GroundProperty = {
  id_solo: string;
  tipo_solo: string;
  capacidade_campo: string;
  ponto_murcha: string;
  densidade: string;
};

type BombProps = {
  fabricante: string;
  modelo: string;
  potencia: string;
  vazao_maxima: string;
  consumo: string;
  valor_kw: string;
};

type SystemsProps = {
  nome: string;
  eficiencia_irrigacao: number;
  area_total_plantio: number;
  quantidade_setores: number;
  tipo_irrigacao: string;
  nome_setor: string;
  area_irrigada: number;
  espacamento_linha: number;
  coeficiente_uniformidade: number;
  eficiencia_sistema: number;
  vazao_aspressor?: number;
  espacamento_aspressor?: number;
  vazao_emissor?: number;
  espacamento_emissor?: number;
  percentual_area_molhada?: number;
  percentual_area_sombreada?: number;
  vazao_pivo?: number;
  raio_ultima_torre?: number;
  comprimento_vao_balanco?: number;
  velocidade_ultima_torre?: number;
};

type PropertyDataProps = {
  id_propriedade: string;
  nome: string;
  area_propriedade: string;
  cidade: string;
  estado: string;
  solo: GroundProperty[];
  motobomba: BombProps[];
  sistema_irrigacao: SystemsProps[];
};

const inputStrings = strings.groundInfo.inputs;
const inputBombsStrings = strings.bombInfo.inputs;
const inputSystemStrings = strings.SystemInfo.inputs;

export const Properties: React.FC<PropertiesProps> = ({
  propertyService,
  groundService,
  bombService,
  irrigationSystemService,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyDataProps>({});
  const [actualScreen, setActualScreen] = useState("main");
  const [status, setStatus] = useState({ type: "", message: "" });

  const [tipo_solo, setTipo_solo] = useState("");
  const [capacidade_campo, setCapacidade_campo] = useState("");
  const [ponto_murcha, setPonto_murcha] = useState("");
  const [densidade, setDensidade] = useState("");
  const [cleanGround, setCleanGround] = useState(false);

  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [potencia, setPotencia] = useState("");
  const [vazao_maxima, setVazao_maxima] = useState("");
  const [consumo, setConsumo] = useState("");
  const [valor_kw, setValor_kw] = useState("");

  const [tipo_irrigacao, setTipo_irrigacao] = useState("");
  const [nome, setNome] = useState("");
  const [eficiencia_irrigacao, setEficiencia_irrigacao] = useState("");
  const [area_total_plantio, setArea_total_plantio] = useState("");
  const [quantidade_setores, setQuantidade_setores] = useState("");
  const [nome_setor, setNome_setor] = useState("");
  const [area_irrigada, setArea_irrigada] = useState("");
  const [espacamento_linha, setEspacamento_linha] = useState("");
  const [coeficiente_uniformidade, setCoeficiente_uniformidade] = useState("");
  const [eficiencia_sistema, setEficiencia_sistema] = useState("");
  const [vazao_aspressor, setVazao_aspressor] = useState("");
  const [espacamento_aspressor, setEspacamento_aspressor] = useState("");
  const [vazao_emissor, setVazao_emissor] = useState("");
  const [espacamento_emissor, setEspacamento_emissor] = useState("");
  const [percentual_area_molhada, setpercentual_area_molhada] = useState("");
  const [percentual_area_sombreada, setPercentual_area_sombreada] =
    useState("");

  const cleanInputs = () => {
    setCleanGround(true);
    setCapacidade_campo("");
    setPonto_murcha("");
    setDensidade("");
  };

  const cleanBombsInputs = () => {
    setModelo("");
    setPotencia("");
    setVazao_maxima("");
    setFabricante("");
    setConsumo("");
    setValor_kw("");
  };

  const cleanSystemInputs = () => {
    setCleanGround(true);
    setNome("");
    setEficiencia_irrigacao("");
    setArea_total_plantio("");
    setQuantidade_setores("");
    setNome_setor("");
    setArea_irrigada("");
    setEspacamento_linha("");
    setCoeficiente_uniformidade("");
    setEficiencia_sistema("");
    setVazao_aspressor("");
    setEspacamento_aspressor("");
    setVazao_emissor("");
    setEspacamento_emissor("");
    setpercentual_area_molhada("");
    setPercentual_area_sombreada("");
  };

  const { isLoading, refetch: refresh } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getProperties(),
  });

  const {
    data: allItems,
    isLoading: isLoadingItems,
    refetch,
  } = useQuery({
    queryKey: ["AllItems"],
    queryFn: () => propertyService.getAllPropertiesItems(),
  });

  const removeProperty = useMutation<AxiosError>({
    mutationFn: (id) => propertyService.deleteProperty(Number(id)),
    mutationKey: ["properties"],
    onSuccess: () => {
      refetch();
      refresh();
      setShowModal(false);
    },
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
        id_propriedade: propertyData && Number(propertyData.id_propriedade),
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

  const validateValuesBombs = {
    fabricante,
    modelo,
    potencia,
    vazao_maxima,
    consumo,
    valor_kw,
  };

  const sumbitValuesBombs = {
    fabricante,
    modelo,
    potencia,
    vazao_maxima: Number(vazao_maxima),
    consumo: Number(consumo),
    valor_kw: Number(valor_kw),
    ativada: true,
    id_propriedade: propertyData && Number(propertyData.id_propriedade),
  };

  async function validateBombs() {
    try {
      await bombValidators.validate(validateValuesBombs);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors,
      });
      return false;
    }
  }

  const createBomb = useMutation<AxiosError>({
    mutationFn: () => bombService.newBomb(sumbitValuesBombs),
    onSuccess: () => {
      refetch();
      cleanBombsInputs();
    },
  });

  const onSumbitBomb = async () => {
    if (!(await validateBombs())) {
      return Alert.alert(status.message[0]);
    } else {
      return createBomb.mutate();
    }
  };

  const removeBomb = useMutation<AxiosError>({
    mutationFn: (id) => bombService.deleteBomb(Number(id)),
    mutationKey: ["bombs"],
    onSuccess: (data) => {
      refetch();
    },
  });

  const validateValuesSystem = {
    nome,
    eficiencia_irrigacao,
    area_total_plantio,
    quantidade_setores,
    tipo_irrigacao,
    nome_setor,
    area_irrigada,
    espacamento_linha,
    coeficiente_uniformidade,
    eficiencia_sistema,
  };

  const sumbitValuesSystem = {
    nome,
    eficiencia_irrigacao: Number(eficiencia_irrigacao),
    area_total_plantio: Number(area_total_plantio),
    quantidade_setores: Number(quantidade_setores),
    tipo_irrigacao,
    nome_setor,
    area_irrigada: Number(area_irrigada),
    espacamento_linha: Number(espacamento_linha),
    coeficiente_uniformidade: Number(coeficiente_uniformidade),
    eficiencia_sistema: Number(eficiencia_sistema),
    vazao_aspressor: Number(vazao_aspressor),
    espacamento_aspressor: Number(espacamento_aspressor),
    vazao_emissor: Number(vazao_emissor),
    espacamento_emissor: Number(espacamento_emissor),
    percentual_area_molhada: Number(percentual_area_molhada),
    percentual_area_sombreada: Number(percentual_area_sombreada),
    vazao_pivo: 0,
    raio_ultima_torre: 0,
    comprimento_vao_balanco: 0,
    velocidade_ultima_torre: 0,
    ativo: true,
    id_propriedade: propertyData && Number(propertyData.id_propriedade),
  };

  const createSystem = useMutation<AxiosError>({
    mutationFn: () =>
      irrigationSystemService.newIrrigationSystem(sumbitValuesSystem),
    onSuccess: (data) => {
      refetch();
      cleanSystemInputs();
    },
  });

  async function validateSystem() {
    try {
      await systemValidators.validate(validateValuesSystem);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors,
      });
      return false;
    }
  }

  const removeSystem = useMutation<AxiosError>({
    mutationFn: (id) => irrigationSystemService.deleteSystem(Number(id)),
    mutationKey: ["irrigationSystems"],
    onSuccess: (data) => {
      refetch();
    },
  });

  const onSumbitSystem = async () => {
    if (!(await validateSystem())) {
      return Alert.alert(status.message[0]);
    } else {
      return createSystem.mutate();
    }
  };

  const findGround = () =>
    allItems.data.filter(
      (item) => item.id_propriedade === propertyData.id_propriedade
    );

  if (isLoading && isLoadingItems) return <Text>Carregando...</Text>;

  console.log("allItems", JSON.stringify(allItems, null, 2));

  return (
    <>
      {actualScreen === "main" && (
        <S.Container isModalActive={showModal === true}>
          <Header minHeader={false} />
          {allItems && (
            <ScrollView>
              <S.PropertyContainer>
                {allItems &&
                  allItems.data.map((it) => {
                    return (
                      <PropertyCard
                        image={require("../../../../assets/farm2.png")}
                        cultureTitle={it.nome}
                        plantingDate={it.data_plantio}
                        dimension={it.area_propriedade}
                        city={it.cidade}
                        state={it.estado}
                        grounds={it.solo.length}
                        bombs={it.motobomba.length}
                        systems={it.sistema_irrigacao.length}
                        action={() => {
                          setPropertyData(it);
                          setShowModal(true);
                        }}
                      />
                    );
                  })}
              </S.PropertyContainer>
              <Modal
                animationType="slide"
                visible={showModal}
                transparent={true}
                onRequestClose={() => {}}
                presentationStyle="overFullScreen"
              >
                <S.ModalContainer>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <S.HeaderModal>
                      <Typography
                        style={{
                          fontFamily: "Poppins-bold",
                          fontSize: 18,
                          width: "85%",
                          textAlign: "center",
                          marginLeft: 28,
                        }}
                        color="positive"
                        size="normal"
                        weight="bold"
                      >
                        {propertyData.nome}
                      </Typography>
                      <S.CloseModalButton onPress={() => setShowModal(false)}>
                        <AntDesign name="close" size={24} color="black" />
                      </S.CloseModalButton>
                    </S.HeaderModal>
                    <Typography
                      style={{
                        fontFamily: "Poppins-regular",
                        fontSize: 12,
                      }}
                      color="gray-5"
                      size="normal"
                      weight="regular"
                    >
                      {propertyData.area_propriedade} ha - {propertyData.cidade}{" "}
                      - {propertyData.estado}
                    </Typography>
                    <Image
                      source={require("../../../../assets/farm2.png")}
                      transition={300}
                      style={{
                        width: 90,
                        height: 90,
                        display: "flex",
                        marginLeft: 8,
                      }}
                      contentFit="cover"
                    />

                    <S.SectionContainer>
                      <S.SectionHeader>
                        <Typography
                          style={{
                            fontFamily: "Poppins-bold",
                            fontSize: 14,
                          }}
                          color="positive"
                          size="normal"
                          weight="bold"
                        >
                          Solo (
                          {propertyData.solo && findGround()[0].solo.length})
                        </Typography>
                        <S.EditButton onPress={() => setActualScreen("ground")}>
                          <Typography
                            style={{
                              fontFamily: "Poppins-bold",
                              fontSize: 14,
                              textDecorationLine: "underline",
                            }}
                            color="positive"
                            size="normal"
                            weight="bold"
                          >
                            Editar
                          </Typography>
                        </S.EditButton>
                      </S.SectionHeader>
                      {propertyData.solo && propertyData.solo.length > 0 && (
                        <>
                          {propertyData &&
                            findGround()[0].solo.map((item) => {
                              return (
                                <S.SectioContent>
                                  <View>
                                    <S.InfoText>
                                      Tipo:{" "}
                                      <S.InfoTextBold>
                                        {item.tipo_solo}
                                      </S.InfoTextBold>
                                    </S.InfoText>
                                    <S.InfoText>
                                      Capacidade:{" "}
                                      <S.InfoTextBold>
                                        {item.capacidade_campo}%
                                      </S.InfoTextBold>
                                    </S.InfoText>
                                  </View>
                                  <View>
                                    <S.InfoText>
                                      P. de Murcha:{" "}
                                      <S.InfoTextBold>
                                        {item.ponto_murcha}%
                                      </S.InfoTextBold>
                                    </S.InfoText>
                                    <S.InfoText>
                                      Densidade:{" "}
                                      <S.InfoTextBold>
                                        {item.densidade}g/m²
                                      </S.InfoTextBold>
                                    </S.InfoText>
                                  </View>
                                </S.SectioContent>
                              );
                            })}
                        </>
                      )}
                    </S.SectionContainer>
                    <S.Divisor />
                    <S.SectionContainer>
                      <S.SectionHeader>
                        <Typography
                          style={{
                            fontFamily: "Poppins-bold",
                            fontSize: 14,
                          }}
                          color="positive"
                          size="normal"
                          weight="bold"
                        >
                          Motobomba (
                          {propertyData.motobomba &&
                            findGround()[0].motobomba.length}
                          )
                        </Typography>
                        <S.EditButton onPress={() => setActualScreen("bombs")}>
                          <Typography
                            style={{
                              fontFamily: "Poppins-bold",
                              fontSize: 14,
                              textDecorationLine: "underline",
                            }}
                            color="positive"
                            size="normal"
                            weight="bold"
                          >
                            Editar
                          </Typography>
                        </S.EditButton>
                      </S.SectionHeader>
                      {propertyData.motobomba &&
                        propertyData.motobomba.length > 0 && (
                          <>
                            {propertyData &&
                              findGround()[0].motobomba.map((item) => {
                                return (
                                  <S.SectioContent>
                                    <View>
                                      <S.InfoText>
                                        Fab:{" "}
                                        <S.InfoTextBold>
                                          {item.fabricante}
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Potência:{" "}
                                        <S.InfoTextBold>
                                          {item.potencia}w
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Consumo:{" "}
                                        <S.InfoTextBold>
                                          {item.consumo}kw/h
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                    </View>
                                    <View>
                                      <S.InfoText>
                                        Modelo:{" "}
                                        <S.InfoTextBold>
                                          {item.modelo}
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Vazão:{" "}
                                        <S.InfoTextBold>
                                          {item.vazao_maxima}m²/ha
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Valor/kw:{" "}
                                        <S.InfoTextBold>
                                          R${item.valor_kw},00
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                    </View>
                                  </S.SectioContent>
                                );
                              })}
                          </>
                        )}
                    </S.SectionContainer>
                    <S.Divisor />
                    <S.SectionContainer>
                      <S.SectionHeader>
                        <Typography
                          style={{
                            fontFamily: "Poppins-bold",
                            fontSize: 14,
                          }}
                          color="positive"
                          size="normal"
                          weight="bold"
                        >
                          Sistema de irrigação (
                          {propertyData.sistema_irrigacao &&
                            findGround()[0].sistema_irrigacao.length}
                          )
                        </Typography>
                        <S.EditButton
                          onPress={() => setActualScreen("systems")}
                        >
                          <Typography
                            style={{
                              fontFamily: "Poppins-bold",
                              fontSize: 14,
                              textDecorationLine: "underline",
                            }}
                            color="positive"
                            size="normal"
                            weight="bold"
                          >
                            Editar
                          </Typography>
                        </S.EditButton>
                      </S.SectionHeader>
                      {propertyData.sistema_irrigacao &&
                        propertyData.sistema_irrigacao.length > 0 && (
                          <>
                            {propertyData &&
                              findGround()[0].sistema_irrigacao.map((item) => {
                                return (
                                  <S.SectioContent>
                                    <View>
                                      <S.InfoText>
                                        Eficiência:{" "}
                                        <S.InfoTextBold>
                                          {item.eficiencia_irrigacao}%
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Setores:{" "}
                                        <S.InfoTextBold>
                                          {item.quantidade_setores}
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Área:{" "}
                                        <S.InfoTextBold>
                                          {item.area_total_plantio}m²
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Tipo:{" "}
                                        <S.InfoTextBold>
                                          {item.tipo_irrigacao}
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Nome do Setor:{" "}
                                        <S.InfoTextBold>
                                          {item.nome_setor}
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Área irrigada:{" "}
                                        <S.InfoTextBold>
                                          {item.area_irrigada}m²
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      {item.vazao_emissor !== 0 && (
                                        <S.InfoText>
                                          Vazão do emissor:{" "}
                                          <S.InfoTextBold>
                                            {item.vazao_emissor}L/h
                                          </S.InfoTextBold>
                                        </S.InfoText>
                                      )}
                                      {item.vazao_aspressor !== 0 && (
                                        <S.InfoText>
                                          Vazão do aspressor:{" "}
                                          <S.InfoTextBold>
                                            {item.espacamento_aspressor}L/h
                                          </S.InfoTextBold>
                                        </S.InfoText>
                                      )}
                                      {item.espacamento_emissor !== 0 && (
                                        <S.InfoText>
                                          Esp. entre emissores:{" "}
                                          <S.InfoTextBold>
                                            {item.espacamento_emissor}m
                                          </S.InfoTextBold>
                                        </S.InfoText>
                                      )}
                                      {item.espacamento_aspressor !== 0 && (
                                        <S.InfoText>
                                          Esp. entre aspressores:{" "}
                                          <S.InfoTextBold>
                                            {item.espacamento_aspressor}m
                                          </S.InfoTextBold>
                                        </S.InfoText>
                                      )}
                                      <S.InfoText>
                                        Coef. de uniformidade CUC:{" "}
                                        <S.InfoTextBold>
                                          {item.coeficiente_uniformidade}%
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      <S.InfoText>
                                        Eficiência do sistema:{" "}
                                        <S.InfoTextBold>
                                          {item.eficiencia_sistema}%
                                        </S.InfoTextBold>
                                      </S.InfoText>
                                      {item.percentual_area_molhada !== 0 && (
                                        <S.InfoText>
                                          Percentual de área molhada:{" "}
                                          <S.InfoTextBold>
                                            {item.percentual_area_molhada}%
                                          </S.InfoTextBold>
                                        </S.InfoText>
                                      )}
                                      {item.percentual_area_sombreada !== 0 && (
                                        <S.InfoText>
                                          Percentual de área sombreada:{" "}
                                          <S.InfoTextBold>
                                            {item.percentual_area_sombreada}%
                                          </S.InfoTextBold>
                                        </S.InfoText>
                                      )}
                                    </View>
                                  </S.SectioContent>
                                );
                              })}
                          </>
                        )}
                    </S.SectionContainer>
                    <Button
                      onPress={() =>
                        removeProperty.mutate(propertyData.id_propriedade)
                      }
                      bg-color="negative"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 24,
                        width: "90%",
                      }}
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
                        Apagar Propriedade
                      </Typography>
                    </Button>
                  </ScrollView>
                </S.ModalContainer>
              </Modal>
            </ScrollView>
          )}
        </S.Container>
      )}
      {actualScreen === "ground" && (
        <S.GroundContainer>
          <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
            <S.GroundContent>
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
                title="Solo"
                objKey="id"
                objValue="name"
                data={groundTypes}
                label="Tipo de Solo"
                setValue={(value) => setTipo_solo(value)}
                setId={() => {}}
                stateValue={undefined}
                clean={cleanGround}
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

              {propertyData &&
                findGround()[0].solo.map((item) => (
                  <S.CardContainer key={item.id_solo}>
                    <S.CardContent>
                      <S.InfoTitle>{item.tipo_solo}</S.InfoTitle>
                      <S.InfoText>
                        Capacidade de Campo:{" "}
                        <S.InfoTextBold>
                          {item.capacidade_campo}%
                        </S.InfoTextBold>
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

              <S.ButtonsContainer>
                <Button
                  onPress={() => setActualScreen("main")}
                  bg-color="negative"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    marginBottom: 24,
                    width: "45%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins-regular",
                      fontSize: 18,
                    }}
                    color="pure-white"
                    size="normal"
                    weight="bold"
                  >
                    Voltar
                  </Typography>
                </Button>
                <Button
                  onPress={() => setActualScreen("main")}
                  bg-color="positive"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    marginBottom: 24,
                    width: "45%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins-regular",
                      fontSize: 18,
                    }}
                    color="pure-white"
                    size="normal"
                    weight="bold"
                  >
                    Salvar
                  </Typography>
                </Button>
              </S.ButtonsContainer>
            </S.GroundContent>
          </ScrollView>
        </S.GroundContainer>
      )}
      {actualScreen === "bombs" && (
        <S.BombsContainer>
          <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
            <S.Content>
              <View>
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
                  {strings.bombInfo.title}
                </Typography>
                <Input
                  label={inputBombsStrings.manufacturer.label}
                  placeholder={inputBombsStrings.manufacturer.placeholder}
                  value={fabricante}
                  onChangeText={(value) => setFabricante(value)}
                />
                <Input
                  label={inputBombsStrings.model.label}
                  placeholder={inputBombsStrings.model.placeholder}
                  value={modelo}
                  onChangeText={(value) => setModelo(value)}
                />
                <Input
                  label={inputBombsStrings.power.label}
                  placeholder={inputBombsStrings.power.placeholder}
                  value={potencia}
                  onChangeText={(value) => setPotencia(value)}
                  inputMode="numeric"
                />
                <View>
                  <Input
                    label={inputBombsStrings.flowRate.label}
                    placeholder={inputBombsStrings.flowRate.placeholder}
                    value={vazao_maxima}
                    onChangeText={(value) => setVazao_maxima(value)}
                    inputMode="numeric"
                  />
                </View>
                <View>
                  <Input
                    label={inputBombsStrings.consumption.label}
                    placeholder={inputBombsStrings.consumption.placeholder}
                    value={consumo}
                    onChangeText={(value) => setConsumo(value)}
                    inputMode="numeric"
                  />
                </View>
                <Input
                  label={inputBombsStrings.value.label}
                  placeholder={inputBombsStrings.value.placeholder}
                  value={valor_kw}
                  onChangeText={(value) => setValor_kw(value)}
                  inputMode="numeric"
                />

                <S.AddBombsButton onPress={() => onSumbitBomb()}>
                  <Ionicons name="add" size={24} color="#fff" />
                  <Typography
                    style={{
                      fontFamily: "Poppins-bold",
                      marginLeft: 8,
                    }}
                    color="pure-white"
                    size="tiny"
                    weight="regular"
                  >
                    {strings.bombInfo.addButtonn}
                  </Typography>
                </S.AddBombsButton>

                {propertyData &&
                  findGround()[0].motobomba.map((item) => (
                    <S.CardContainer key={item.id_motobomba}>
                      <S.CardContent>
                        <S.InfoTitle>{item.modelo}</S.InfoTitle>
                        <S.InfoText>
                          Fabricante:{" "}
                          <S.InfoTextBold>{item.fabricante}</S.InfoTextBold>
                        </S.InfoText>
                        <S.InfoText>
                          Potência:{" "}
                          <S.InfoTextBold>{item.potencia}w</S.InfoTextBold>
                        </S.InfoText>
                        <S.InfoText>
                          Vazão Máxima:{" "}
                          <S.InfoTextBold>
                            {item.vazao_maxima}m³/ha
                          </S.InfoTextBold>
                        </S.InfoText>
                        <S.InfoText>
                          Consumo:{" "}
                          <S.InfoTextBold>{item.consumo}kw/h</S.InfoTextBold>
                        </S.InfoText>
                        <S.InfoText>
                          Valor do Kw:{" "}
                          <S.InfoTextBold>R${item.valor_kw}</S.InfoTextBold>
                        </S.InfoText>
                      </S.CardContent>
                      <TouchableOpacity
                        onPress={() => removeBomb.mutate(item.id_motobomba)}
                      >
                        <Ionicons name="trash-outline" size={24} color="red" />
                      </TouchableOpacity>
                    </S.CardContainer>
                  ))}
                <S.ButtonsContainer>
                <Button
                  onPress={() => setActualScreen("main")}
                  bg-color="negative"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    marginBottom: 24,
                    width: "45%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins-regular",
                      fontSize: 18,
                    }}
                    color="pure-white"
                    size="normal"
                    weight="bold"
                  >
                    Voltar
                  </Typography>
                </Button>
                <Button
                  onPress={() => setActualScreen("main")}
                  bg-color="positive"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    marginBottom: 24,
                    width: "45%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins-regular",
                      fontSize: 18,
                    }}
                    color="pure-white"
                    size="normal"
                    weight="bold"
                  >
                    Salvar
                  </Typography>
                </Button>
              </S.ButtonsContainer>
              </View>
            </S.Content>
          </ScrollView>
        </S.BombsContainer>
      )}
      {actualScreen === "systems" && (
        <S.SystemContainer>
          <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
            <S.Content>
              <View>
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
                  {strings.SystemInfo.title}
                </Typography>
                <Input
                  label={inputSystemStrings.name.label}
                  placeholder={inputSystemStrings.name.placeholder}
                  style={{ fontFamily: "Poppins-regular" }}
                  value={nome}
                  onChangeText={(value) => setNome(value)}
                />
                <Input
                  label={inputSystemStrings.efficiency.label}
                  placeholder={inputSystemStrings.efficiency.placeholder}
                  value={eficiencia_irrigacao}
                  onChangeText={(value) => setEficiencia_irrigacao(value)}
                  inputMode="numeric"
                />
                <Input
                  label={inputSystemStrings.area.label}
                  placeholder={inputSystemStrings.area.placeholder}
                  value={area_total_plantio}
                  onChangeText={(value) => setArea_total_plantio(value)}
                  inputMode="numeric"
                />
                <View>
                  <Input
                    label={inputSystemStrings.sectorQuantity.label}
                    placeholder={inputSystemStrings.sectorQuantity.placeholder}
                    value={quantidade_setores}
                    onChangeText={(value) => setQuantidade_setores(value)}
                    inputMode="numeric"
                  />
                </View>
                <View>
                  <Select
                    label={inputSystemStrings.irrigationType.label}
                    touchableText={
                      inputSystemStrings.irrigationType.placeholder
                    }
                    data={irrigationTypeSelect}
                    setValue={setTipo_irrigacao}
                    setId={() => {}}
                    stateValue={undefined}
                    clean={cleanGround}
                  />
                </View>

                {tipo_irrigacao === "Aspersão Convencional" && (
                  <>
                    <Input
                      label={inputSystemStrings.sectorName.label}
                      placeholder={inputSystemStrings.sectorName.placeholder}
                      value={nome_setor}
                      onChangeText={(value) => setNome_setor(value)}
                    />
                    <Input
                      label={inputSystemStrings.irrigatedArea.label}
                      placeholder={inputSystemStrings.irrigatedArea.placeholder}
                      value={area_irrigada}
                      onChangeText={(value) => setArea_irrigada(value)}
                      inputMode="numeric"
                    />
                    <Input
                      label={inputSystemStrings.sprinklerFlow.label}
                      placeholder={inputSystemStrings.sprinklerFlow.placeholder}
                      value={vazao_aspressor}
                      onChangeText={(value) => setVazao_aspressor(value)}
                      inputMode="numeric"
                    />
                    <Input
                      label={inputSystemStrings.sprinklerSpace.label}
                      placeholder={
                        inputSystemStrings.sprinklerSpace.placeholder
                      }
                      value={espacamento_aspressor}
                      onChangeText={(value) => setEspacamento_aspressor(value)}
                      inputMode="numeric"
                    />
                    <Input
                      label={inputSystemStrings.linesSpace.label}
                      placeholder={inputSystemStrings.linesSpace.placeholder}
                      value={espacamento_linha}
                      onChangeText={(value) => setEspacamento_linha(value)}
                      inputMode="numeric"
                    />
                    <Input
                      label={inputSystemStrings.CUC.label}
                      placeholder={inputSystemStrings.CUC.placeholder}
                      value={coeficiente_uniformidade}
                      onChangeText={(value) =>
                        setCoeficiente_uniformidade(value)
                      }
                      inputMode="numeric"
                    />
                    <Input
                      label={inputSystemStrings.efficiencySystem.label}
                      placeholder={
                        inputSystemStrings.efficiencySystem.placeholder
                      }
                      value={eficiencia_sistema}
                      onChangeText={(value) => setEficiencia_sistema(value)}
                      inputMode="numeric"
                    />
                  </>
                )}

                {tipo_irrigacao === "Microaspersão ou Gotejamento" && (
                  <>
                    <Input
                      label={inputSystemStrings.sectorName.label}
                      placeholder={inputSystemStrings.sectorName.placeholder}
                      value={nome_setor}
                      onChangeText={(value) => setNome_setor(value)}
                    />
                    <Input
                      label={inputSystemStrings.irrigatedArea.label}
                      placeholder={inputSystemStrings.irrigatedArea.placeholder}
                      value={area_irrigada}
                      onChangeText={(value) => setArea_irrigada(value)}
                    />
                    <Input
                      label={inputSystemStrings.issuerFlow.label}
                      placeholder={inputSystemStrings.issuerFlow.placeholder}
                      value={vazao_emissor}
                      onChangeText={(value) => setVazao_emissor(value)}
                    />
                    <Input
                      label={inputSystemStrings.issuerSpace.label}
                      placeholder={inputSystemStrings.issuerSpace.placeholder}
                      value={espacamento_emissor}
                      onChangeText={(value) => setEspacamento_emissor(value)}
                    />
                    <Input
                      label={inputSystemStrings.linesSpace.label}
                      placeholder={inputSystemStrings.linesSpace.placeholder}
                      value={espacamento_linha}
                      onChangeText={(value) => setEspacamento_linha(value)}
                    />
                    <Input
                      label={inputSystemStrings.CUC.label}
                      placeholder={inputSystemStrings.CUC.placeholder}
                      value={coeficiente_uniformidade}
                      onChangeText={(value) =>
                        setCoeficiente_uniformidade(value)
                      }
                    />
                    <Input
                      label={inputSystemStrings.efficiencySystem.label}
                      placeholder={
                        inputSystemStrings.efficiencySystem.placeholder
                      }
                      value={eficiencia_sistema}
                      onChangeText={(value) => setEficiencia_sistema(value)}
                    />
                    <Input
                      label={inputSystemStrings.wetAreaPercentage.label}
                      placeholder={
                        inputSystemStrings.wetAreaPercentage.placeholder
                      }
                      value={percentual_area_molhada}
                      onChangeText={(value) =>
                        setpercentual_area_molhada(value)
                      }
                    />
                    <Input
                      label={inputSystemStrings.shadedAreaPercentage.label}
                      placeholder={
                        inputSystemStrings.shadedAreaPercentage.placeholder
                      }
                      value={percentual_area_sombreada}
                      onChangeText={(value) =>
                        setPercentual_area_sombreada(value)
                      }
                    />
                  </>
                )}

                <S.AddSystemButton onPress={() => onSumbitSystem()}>
                  <Ionicons name="add" size={24} color="#fff" />
                  <Typography
                    style={{
                      fontFamily: "Poppins-bold",
                      fontSize: 12,
                    }}
                    color="pure-white"
                    size="normal"
                    weight="regular"
                  >
                    {strings.SystemInfo.addButtonn}
                  </Typography>
                </S.AddSystemButton>

                {propertyData &&
                  findGround()[0].sistema_irrigacao.map((item) => {
                    if (item.tipo_irrigacao === "Aspersão Convencional") {
                      return (
                        <S.CardContainer key={item.id_sistema_irrigacao}>
                          <S.CardContent>
                            <S.InfoTitle>{item.nome}</S.InfoTitle>
                            <S.InfoText>
                              Eficiência de Irrigação:{" "}
                              <S.InfoTextBold>
                                {item.eficiencia_irrigacao}%
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Área total do Plantio:{" "}
                              <S.InfoTextBold>
                                {item.area_total_plantio}m²
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Quantidade de Setores:{" "}
                              <S.InfoTextBold>
                                {item.quantidade_setores}
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Tipo de Irrigação:{" "}
                              <S.InfoTextBold>
                                {item.tipo_irrigacao}
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Nome do Setor:{" "}
                              <S.InfoTextBold>{item.nome_setor}</S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Área irrigada:{" "}
                              <S.InfoTextBold>
                                {item.area_irrigada}m²
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Vazão do Aspersor:{" "}
                              <S.InfoTextBold>
                                {item.vazao_aspressor}L/H
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Espaçamento entre Aspersores:{" "}
                              <S.InfoTextBold>
                                {item.espacamento_aspressor}m
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Espaçamento entre linhas:{" "}
                              <S.InfoTextBold>
                                {item.espacamento_linha}m
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Coeficiente de Uniformidade CUC:{" "}
                              <S.InfoTextBold>
                                {item.coeficiente_uniformidade}%
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Eficiência do Sistema:{" "}
                              <S.InfoTextBold>
                                {item.eficiencia_sistema}%
                              </S.InfoTextBold>
                            </S.InfoText>
                          </S.CardContent>
                          <TouchableOpacity
                            onPress={() =>
                              removeSystem.mutate(item.id_sistema_irrigacao)
                            }
                          >
                            <Ionicons
                              name="trash-outline"
                              size={24}
                              color="red"
                            />
                          </TouchableOpacity>
                        </S.CardContainer>
                      );
                    }
                    if (
                      item.tipo_irrigacao === "Microaspersão ou Gotejamento"
                    ) {
                      return (
                        <S.CardContainer key={item.id_sistema_irrigacao}>
                          <S.CardContent>
                            <S.InfoTitle>{item.nome}</S.InfoTitle>
                            <S.InfoText>
                              Eficiência de Irrigação:{" "}
                              <S.InfoTextBold>
                                {item.eficiencia_irrigacao}%
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Área total do Plantio:{" "}
                              <S.InfoTextBold>
                                {item.area_total_plantio}m²
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Quantidade de Setores:{" "}
                              <S.InfoTextBold>
                                {item.quantidade_setores}
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Tipo de Irrigação:{" "}
                              <S.InfoTextBold>
                                {item.tipo_irrigacao}
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Nome do Setor:{" "}
                              <S.InfoTextBold>{item.nome_setor}</S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Área irrigada:{" "}
                              <S.InfoTextBold>
                                {item.area_irrigada}m²
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Vazão do Emissor:{" "}
                              <S.InfoTextBold>
                                {item.vazao_emissor}L/H
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Espaçamento entre Emissores:{" "}
                              <S.InfoTextBold>
                                {item.espacamento_emissor}m
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Espaçamento entre linhas:{" "}
                              <S.InfoTextBold>
                                {item.espacamento_linha}m
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Coeficiente de Uniformidade CUC:{" "}
                              <S.InfoTextBold>
                                {item.coeficiente_uniformidade}%
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Eficiência do Sistema:{" "}
                              <S.InfoTextBold>
                                {item.eficiencia_sistema}%
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Percentual de aŕea molhada:{" "}
                              <S.InfoTextBold>
                                {item.percentual_area_molhada}%
                              </S.InfoTextBold>
                            </S.InfoText>
                            <S.InfoText>
                              Percentual de aŕea sombreada:{" "}
                              <S.InfoTextBold>
                                {item.percentual_area_sombreada}%
                              </S.InfoTextBold>
                            </S.InfoText>
                          </S.CardContent>
                          <TouchableOpacity
                            onPress={() =>
                              removeSystem.mutate(item.id_sistema_irrigacao)
                            }
                          >
                            <Ionicons
                              name="trash-outline"
                              size={24}
                              color="red"
                            />
                          </TouchableOpacity>
                        </S.CardContainer>
                      );
                    }
                  })}

<S.ButtonsContainer>
                <Button
                  onPress={() => setActualScreen("main")}
                  bg-color="negative"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    marginBottom: 24,
                    width: "45%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins-regular",
                      fontSize: 18,
                    }}
                    color="pure-white"
                    size="normal"
                    weight="bold"
                  >
                    Voltar
                  </Typography>
                </Button>
                <Button
                  onPress={() => setActualScreen("main")}
                  bg-color="positive"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 24,
                    marginBottom: 24,
                    width: "45%",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: "Poppins-regular",
                      fontSize: 18,
                    }}
                    color="pure-white"
                    size="normal"
                    weight="bold"
                  >
                    Salvar
                  </Typography>
                </Button>
              </S.ButtonsContainer>
              </View>
            </S.Content>
          </ScrollView>
        </S.SystemContainer>
      )}
    </>
  );
};
