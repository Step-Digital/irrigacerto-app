import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Typography } from "../../components/typography";
import { Header } from "../../components/Header";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { strings } from "../../../utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import MaskInput from "react-native-mask-input";
import { MaterialIcons } from "@expo/vector-icons";

import * as S from "./style";
import { OnboardingModal } from "../../components/OnboardingModal";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { CacheDomain } from "../../../core/domain/cache.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { BombDomain } from "../../../core/domain/bomb.domain";
import { GroundDomain } from "../../../core/domain/ground.domain";
import { IrrigationSystemDomain } from "../../../core/domain/irrigationSystem.domain";
import { CultureDomain } from "../../../core/domain/culture.domain";
import { CultureCard } from "../../components/CultureCard";
import { Input } from "../../components/input";
import moment from "moment";
import { Button } from "../../components/button";
import { Select } from "../../components/SelectInput";
import { AxiosError } from "axios";

type HomeLoggedProps = {
  auth: AuthDomain;
  cache: CacheDomain;
  propertyService: NewPropertyDomain;
  groundService: GroundDomain;
  bombService: BombDomain;
  irrigationSystemService: IrrigationSystemDomain;
  cultureService: CultureDomain;
};

interface DadosCulturaProps {
  nome: string;
  id_dados_cultura: number;
}

interface CultureSelectedProps {
  dados_cultura: DadosCulturaProps;
  nome_cultura: string;
  area_plantio: string;
  setores: string;
  estagio_colheita: string;
  data_plantio: string;
  solo: {
    tipo_solo: string;
    id_solo: string;
  };
  motobomba: {
    modelo: string;
    id_motobomba: string;
  };
  sistema_irrigacao: {
    nome: string;
    id_sistema_irrigacao: string;
  };
  id_propriedade: number;
  id_cultura: number;
  nome: string;
}

const inputStrings = strings.CultureInfo.inputs;

export const HomeLogged: React.FC<HomeLoggedProps> = ({
  propertyService,
  groundService,
  bombService,
  irrigationSystemService,
  cultureService,
}) => {
  const [openButtonsMOdal, setOpenButtonsModal] = useState(false);
  const [showProperties, setShowProperties] = useState(null);
  const [cultureSelected, setCultureSelected] =
    useState<CultureSelectedProps>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [nome_cultura, setNome_cultura] = useState(
    cultureSelected && cultureSelected.nome_cultura
  );
  const [data_plantio, setData_plantio] = useState(
    cultureSelected && cultureSelected.data_plantio
  );
  const [area_plantio, setArea_plantio] = useState(
    cultureSelected && cultureSelected.area_plantio
  );
  const [setores, setSetores] = useState(
    cultureSelected && cultureSelected.setores
  );
  const [estagio_colheita, setEstagio_colheita] = useState(
    cultureSelected && cultureSelected.estagio_colheita
  );
  const [id_dados_cultura, serId_dados_cultura] = useState(
    cultureSelected && cultureSelected.dados_cultura
  );
  const [id_propriedade, setId_propriedade] = useState(
    cultureSelected && cultureSelected.id_propriedade
  );
  const [id_sistema_irrigacao, setId_sistema_irrigacao] = useState(
    cultureSelected && cultureSelected.sistema_irrigacao
  );
  const [id_motobomba, setId_motobomba] = useState(
    cultureSelected && cultureSelected.motobomba
  );
  const [id_solo, setId_solo] = useState(
    cultureSelected && cultureSelected.solo
  );
  const [status, setStatus] = useState({ type: "", message: "" });

  const [selectedEditProperty, setSelectedEditProperty] = useState(
    cultureSelected && cultureSelected.nome
  );
  const [selectedEditGround, setSelectedEditGround] = useState(
    cultureSelected && cultureSelected.solo
  );
  const [selectedEditBomb, setSelectedEditBomb] = useState(
    cultureSelected && cultureSelected.motobomba
  );
  const [selectedEditSystem, setSelectedEditSystem] = useState(
    cultureSelected && cultureSelected.sistema_irrigacao
  );
  const sumbitValues = {
    nome_cultura,
    data_plantio,
    area_plantio,
    setores,
    estagio_colheita,
    id_dados_cultura,
    id_propriedade: cultureSelected && cultureSelected.id_propriedade,
    id_sistema_irrigacao:
      cultureSelected && cultureSelected.sistema_irrigacao.id_sistema_irrigacao,
    id_motobomba: cultureSelected && cultureSelected.motobomba.id_motobomba,
    id_solo: cultureSelected && cultureSelected.solo.id_solo,
  };

  console.log('submit', JSON.stringify(sumbitValues, null, 2));

  const getAllDefaultValues = () => {
    setNome_cultura(cultureSelected.nome_cultura);
    setData_plantio(cultureSelected.data_plantio);
    setArea_plantio(cultureSelected.area_plantio);
    setEstagio_colheita(cultureSelected.estagio_colheita);
    setSetores(cultureSelected.setores);
    setId_solo(cultureSelected.solo.id_solo);
    setId_motobomba(cultureSelected.motobomba.modelo);
    setId_sistema_irrigacao(cultureSelected.sistema_irrigacao.nome);
    serId_dados_cultura(cultureSelected.dados_cultura.id_dados_cultura);
    setId_propriedade(cultureSelected.id_propriedade);
    setSelectedEditGround(cultureSelected.solo.tipo_solo);
    setSelectedEditBomb(cultureSelected.motobomba.modelo);
    setSelectedEditSystem(cultureSelected.sistema_irrigacao.nome);
    setSelectedEditProperty(cultureSelected.nome);
  };

  useEffect(() => {
    if (cultureSelected !== null) {
      getAllDefaultValues();
    }
  }, [cultureSelected]);

  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getProperties(),
  });

  const {
    data: allData,
    isLoading: isLoadingAll,
    refetch,
  } = useQuery({
    queryKey: ["AllProperties"],
    queryFn: () => propertyService.getAllPropertiesData(),
  });

  function disableButton() {
    if (allData.data.length === 0) return true;
    return false;
  }

  const groundQuery = useQuery({
    queryKey: ["grounds"],
    queryFn: () => groundService.getGrounds(),
  });

  const systemsQuery = useQuery({
    queryKey: ["systems"],
    queryFn: () => irrigationSystemService.getSystems(),
  });

  const bombQuery = useQuery({
    queryKey: ["bombs"],
    queryFn: () => bombService.getBombs(),
  });

  const properties =
    !isLoading &&
    data.data.map((item) => {
      return {
        name: item.nome,
        id: item.id_propriedade,
      };
    });

  const grounds =
    !groundQuery.isLoading &&
    groundQuery.data.data.map((item) => {
      return {
        name: item.tipo_solo,
        id: item.id_solo,
      };
    });

  const bombs =
    !bombQuery.isLoading &&
    bombQuery.data.data.map((item) => {
      return {
        name: item.modelo,
        id: item.id_motobomba,
      };
    });

  const systems =
    !systemsQuery.isLoading &&
    systemsQuery.data.data.map((item) => {
      return {
        name: item.nome,
        id: item.id_sistema_irrigacao,
      };
    });

  const navigation = useNavigation<NavigationProps>();

  const isSomeCulture =
    allData && allData.data.some((item) => item.cultura.length > 0);

  const editCulture = useMutation<AxiosError>({
    mutationFn: () =>
      cultureService.editCulture(sumbitValues, cultureSelected.id_cultura),
    onSuccess: () => {
      refetch();
      setIsEdit(false);
    },
  });

  // const totalStage3 =
  //   cultureSelected.duracao_estagio1 +
  //   cultureSelected.duracao_estagio2 +
  //   cultureSelected.duracao_estagio3;

  // const totalStage2 =
  //   cultureSelected.duracao_estagio1 + cultureSelected.duracao_estagio2;

  // const totalStage1 = cultureSelected.duracao_estagio1;

  // function setStage() {
  //   var initialDate = data_plantio;
  //   var dateNow = new Date();
  //   var diff = moment(dateNow, "DD/MM/YYYY").diff(
  //     moment(initialDate, "DD/MM/YYYY")
  //   );
  //   var days = moment.duration(diff).asDays();
  //   console.log("days", days);

  //   if (days > totalStage3) {
  //     return setEstagio_colheita("4");
  //   } else if (days <= totalStage3 && days > totalStage2) {
  //     return setEstagio_colheita("3");
  //   } else if (days <= totalStage2 && days > totalStage1) {
  //     return setEstagio_colheita("2");
  //   } else {
  //     return setEstagio_colheita("1");
  //   }
  // }

  // console.log('allData', JSON.stringify(allData, null, 2));

  // useEffect(() => {
  //   if (cultureSelected !== null) {
  //     setId_solo(cultureSelected.solo.id_solo);
  //     setId_motobomba(cultureSelected.motobomba.modelo);
  //     setId_sistema_irrigacao(cultureSelected.sistema_irrigacao.nome);
  //     serId_dados_cultura(cultureSelected.dados_cultura.id_dados_cultura);
  //     setId_propriedade(cultureSelected.id_propriedade);
  //   }
  // }, [cultureSelected]);

  // useEffect(() => {
  //   if (cultureSelected !== null) {
  //     setSelectedEditGround(cultureSelected.solo.tipo_solo);
  //     setSelectedEditBomb(cultureSelected.motobomba.modelo);
  //     setSelectedEditSystem(cultureSelected.sistema_irrigacao.nome);
  //   }
  // }, [cultureSelected]);

  return (
    <>
      {!isEdit && (
        <S.Container>
          <Header minHeader={false} />
          {allData && isSomeCulture && (
            <ScrollView>
              <S.PropertyContainer>
                {allData &&
                  allData.data.map((it) => {
                    return (
                      <>
                        <S.PropertyHeader>
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
                                onPress={() =>
                                  setShowProperties(it.id_propriedade)
                                }
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
                        <View>
                          {showProperties === it.id_propriedade &&
                            it.cultura &&
                            it.cultura.map((item) => {
                              return (
                                <CultureCard
                                  image={item.dados_cultura.image_url}
                                  cultureTitle={item.nome_cultura}
                                  plantingDate={item.data_plantio}
                                  stage={item.estagio_colheita}
                                  sector={item.setores}
                                  precipitation={`${it.precipitacao}mm`}
                                  groundStatus="-10mm"
                                  irrigationValue="2 Horas / 5.000 L"
                                  irrigationValueTotal="4 Horas / 10.000 L"
                                  getCulture={() => {
                                    setCultureSelected({
                                      ...item,
                                      id_propriedade: it.id_propriedade,
                                      nome: it.nome,
                                    });
                                    setIsEdit(true);
                                  }}
                                />
                              );
                            })}
                        </View>
                      </>
                    );
                  })}
              </S.PropertyContainer>
            </ScrollView>
          )}

          <S.Content>
            {allData && !isSomeCulture && (
              <>
                <Image
                  source={require("../../../../assets/culture.png")}
                  transition={1000}
                  style={{
                    width: 260,
                    height: 193,
                  }}
                  contentFit="cover"
                />
                <Typography
                  style={{
                    width: 320,
                    textAlign: "center",
                    marginTop: 32,
                    fontFamily: "Poppins-regular",
                  }}
                  color="gray-4"
                  size="normal"
                  weight="regular"
                >
                  {strings.homeLogged.noProperty}
                </Typography>
              </>
            )}

            {allData && allData.data.length === 0 && (
              <Typography
                style={{
                  textAlign: "center",
                  marginTop: 16,
                  fontFamily: "Poppins-regular",
                  padding: 16,
                }}
                color="gray-4"
                size="normal"
                weight="regular"
              >
                {strings.homeLogged.addPropertyText1} &nbsp;
                <Typography
                  style={{
                    textAlign: "center",
                    width: 328,
                    marginTop: 32,
                    textDecorationLine: "underline",
                  }}
                  color="positive"
                  size="normal"
                  weight="bold"
                  onPress={() => navigation.navigate("NewProperty")}
                >
                  {strings.homeLogged.addPropertyText2}
                </Typography>
              </Typography>
            )}
          </S.Content>

          <S.ButtonContainer>
            <S.OpenModalButton
              onPress={() => setOpenButtonsModal(!openButtonsMOdal)}
            >
              <S.OpenModalButtonText>
                {openButtonsMOdal ? "-" : "+"}
              </S.OpenModalButtonText>
            </S.OpenModalButton>
          </S.ButtonContainer>
          {openButtonsMOdal && (
            <S.ButtonModalContainer>
              <S.AddCultureButton
                isDisabled={disableButton() === true}
                bg-color="positive"
                onPress={() => {
                  navigation.navigate("CultureInfo");
                  setOpenButtonsModal(false);
                }}
                disabled={disableButton()}
              >
                <Image
                  source={require("../../../../assets/Light.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Typography
                  style={{ fontFamily: "Poppins-regular", marginLeft: 8 }}
                  color="pure-white"
                  size="normal"
                  weight="medium"
                >
                  {strings.homeLogged.addButton.addCulture}
                </Typography>
              </S.AddCultureButton>
              <S.AddPropertyButton
                bg-color="positive"
                onPress={() => {
                  navigation.navigate("NewProperty");
                  setOpenButtonsModal(false);
                }}
              >
                <Image
                  source={require("../../../../assets/Regular.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Typography
                  style={{ fontFamily: "Poppins-regular", marginLeft: 8 }}
                  color="pure-white"
                  size="normal"
                  weight="medium"
                >
                  {strings.homeLogged.addButton.addProperty}
                </Typography>
              </S.AddPropertyButton>
            </S.ButtonModalContainer>
          )}
          <OnboardingModal />
        </S.Container>
      )}
      {isEdit && (
        <S.CultureContainer>
          <Header
            minHeader
            minTitle={strings.CultureInfo.title}
            // action={() => setCultureStep(1)}
            isFinalStep={false}
          />
          <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
            <View>
              <S.CultureContent>
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
                  {strings.CultureInfo.subTitle}
                </Typography>
                <Input
                  label={inputStrings.culture.label}
                  placeholder={inputStrings.culture.placeholder}
                  value={cultureSelected.dados_cultura.nome}
                  editable={false}
                />
                <Input
                  label={inputStrings.cultureName.label}
                  placeholder={inputStrings.cultureName.placeholder}
                  value={nome_cultura}
                  onChangeText={(value) => setNome_cultura(value)}
                />
                <S.Label>{inputStrings.date.label} </S.Label>
                <S.ContainerInput>
                  <MaskInput
                    placeholder={inputStrings.date.placeholder}
                    value={data_plantio}
                    onChangeText={(value) => setData_plantio(value)}
                    // onBlur={() => setStage()}
                    mask={[
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                </S.ContainerInput>
                <View>
                  <Input
                    label={inputStrings.area.label}
                    placeholder={inputStrings.area.placeholder}
                    value={area_plantio}
                    onChangeText={(value) => setArea_plantio(value)}
                  />
                </View>
                <View>
                  <Input
                    label={inputStrings.sector.label}
                    placeholder={inputStrings.sector.placeholder}
                    value={setores}
                    onChangeText={(value) => setSetores(value)}
                  />
                </View>
                <Input
                  label={inputStrings.stage.label}
                  placeholder={inputStrings.stage.placeholder}
                  value={estagio_colheita}
                  onChangeText={(value) => setEstagio_colheita(value)}
                  editable={false}
                />
                <Select
                  label={inputStrings.property.label}
                  touchableText={inputStrings.property.placeholder}
                  setValue={() => {}}
                  data={properties}
                  setId={() => {
                    setId_propriedade();
                    setSelectedEditProperty(null);
                  }}
                  stateValue={null}
                  selectedEdit={selectedEditProperty}
                />
                <Select
                  label={inputStrings.groundType.label}
                  touchableText={inputStrings.groundType.placeholder}
                  setValue={() => {}}
                  setId={() => {
                    setId_solo();
                    setSelectedEditGround(null);
                  }}
                  data={grounds}
                  stateValue={null}
                  selectedEdit={selectedEditGround}
                />
                <Select
                  label={inputStrings.bomb.label}
                  touchableText={inputStrings.bomb.placeholder}
                  setValue={() => {}}
                  setId={() => {
                    setId_motobomba();
                    setSelectedEditBomb(null);
                  }}
                  data={bombs}
                  stateValue={null}
                  selectedEdit={selectedEditBomb}
                />
                <Select
                  label={inputStrings.irrigationSystem.label}
                  touchableText={inputStrings.irrigationSystem.placeholder}
                  setValue={() => {}}
                  setId={() => {
                    setId_sistema_irrigacao();
                    setSelectedEditSystem(null);
                  }}
                  data={systems}
                  stateValue={null}
                  selectedEdit={selectedEditSystem}
                />
                <Button
                  onPress={() => editCulture.mutate()}
                  bg-color="positive"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 24,
                    marginBottom: 24,
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
                    {strings.CultureInfo.button}
                  </Typography>
                </Button>
              </S.CultureContent>
            </View>
          </ScrollView>
        </S.CultureContainer>
      )}
    </>
  );
};
