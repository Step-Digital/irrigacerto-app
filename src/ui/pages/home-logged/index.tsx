import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Typography } from "../../components/typography";
import { Header } from "../../components/Header";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { strings } from "../../../utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import MaskInput from "react-native-mask-input";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
import { Button } from "../../components/button";
import { Select } from "../../components/SelectInput";
import { AxiosError } from "axios";
import { PropertyHeader } from "../../components/PropertyHeader";
import { ButtonsModal } from "../../components/ButtonsModal";
import moment from "moment";

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
  const [isFirstAccess, setIsFirstAccess] = useState(
    AsyncStorage.getItem("firstAccess") || "true"
  );
  const [showProperties, setShowProperties] = useState(null);
  const [propertySelected, setPropertySelected] = useState(null);
  const [newPreciptation, setNewPreciptation] = useState('');
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

  const { goBack, setOptions } = useNavigation();

  const sumbitValues = {
    nome_cultura,
    data_plantio,
    area_plantio,
    setores,
    estagio_colheita,
    id_dados_cultura,
    id_propriedade,
    id_sistema_irrigacao,
    id_motobomba,
    id_solo,
  };

  const submitValuesProperty = {
    precipitacao: Number(newPreciptation),
  };

  console.log('cultureSelected', JSON.stringify(cultureSelected, null, 2))

  const getAllDefaultValues = () => {
    setNome_cultura(cultureSelected.nome_cultura);
    setData_plantio(cultureSelected.data_plantio);
    setArea_plantio(cultureSelected.area_plantio);
    setEstagio_colheita(cultureSelected.estagio_colheita);
    setSetores(cultureSelected.setores);
    setId_solo(cultureSelected?.solo?.id_solo);
    setId_motobomba(cultureSelected?.motobomba?.id_motobomba);
    setId_sistema_irrigacao(cultureSelected?.sistema_irrigacao?.id_sistema_irrigacao);
    serId_dados_cultura(cultureSelected.dados_cultura.id_dados_cultura);
    setId_propriedade(cultureSelected.id_propriedade);
    setSelectedEditGround(cultureSelected?.solo?.tipo_solo);
    setSelectedEditBomb(cultureSelected?.motobomba?.fabricante);
    setSelectedEditSystem(cultureSelected?.sistema_irrigacao?.nome);
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
    data: dataCalc,
    isLoading: isLoadingCalc,
    refetch: refetchCalc,
  } = useQuery({
    queryKey: ["allCalcCulture"],
    queryFn: () => propertyService.getAllCalcCulture(),
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
    !isLoading && data &&
    data.data.map((item) => {
      return {
        name: item.nome,
        id: item.id_propriedade,
      };
    });

  const grounds =
    !groundQuery.isLoading && groundQuery.data &&
    groundQuery.data.data.map((item) => {
      return {
        name: item.tipo_solo,
        id: item.id_solo,
      };
    });

  const bombs =
    !bombQuery.isLoading && bombQuery.data &&
    bombQuery.data.data.map((item) => {
      return {
        name: item.fabricante,
        id: item.id_motobomba,
      };
    });

  const systems =
    !systemsQuery.isLoading && systemsQuery.data &&
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
      setCultureSelected(null)
    },
  });

  const editProperty = useMutation<AxiosError>({
    mutationFn: () =>
      propertyService.editProperty(
        submitValuesProperty,
        propertySelected && propertySelected.id_propriedade
      ),
    onSuccess: () => {
      refetchCalc();
      setNewPreciptation("");
    },
  });

  const getFirst = async () => {
    const token = await AsyncStorage.getItem("firstAccess");
    console.log("token", token);
    setIsFirstAccess(token);
  };

  useEffect(() => {
    getFirst();
  }, []);


  useEffect(() => {
    setOptions({ gestureEnabled: false });
  }, [setOptions]);

  const getValue = (irrigationValue, time) => {
    const hours = Number(time.split(':')[0])
    const minutes = Number(time.split(':')[1])
    return `${moment().hour(hours).format('HH')}:${moment().hour(minutes).format('HH')} Horas / ${irrigationValue ? irrigationValue : 0} L`
  }

  return (
    <>
      {!isEdit && (
        <S.Container>
          <Header minHeader={false} />
          {allData && isSomeCulture && (
            <ScrollView>
              <S.PropertyContainer>
                {allData &&
                  allData.data.map((it, index) => {
                    return (
                      <>
                        <PropertyHeader
                          it={it}
                          setPropertySelected={setPropertySelected}
                          setShowProperties={setShowProperties}
                          showProperties={showProperties}
                          key={Math.floor(Math.random() * Date.now())}
                        />
                        <View key={Math.floor(Math.random() * Date.now())}>
                          {showProperties === it.id_propriedade &&
                            it.cultura &&
                            it.cultura.map((item) => {
                              return (
                                <CultureCard
                                  key={Math.floor(Math.random() * Date.now())}
                                  image={item.dados_cultura.image_url}
                                  cultureTitle={item.nome_cultura}
                                  plantingDate={item.data_plantio}
                                  stage={item.estagio_colheita}
                                  propertyService={propertyService}
                                  propertySelected={propertySelected}
                                  refetchCalc={refetch}
                                  editPreciptation={() => editProperty.mutate()}
                                  // newPreciptation={newPreciptation}
                                  // setNewPreciptation={setNewPreciptation}
                                  precipitation={`${it.precipitacao}mm`}
                                  groundStatus={
                                    dataCalc.data[index].status_solo || '0'
                                  }
                                  irrigationValue={
                                    getValue(dataCalc.data[index]
                                      .volume_aplicado_setor,  dataCalc.data[index]
                                      .tempo_irrigacao_sugerido_area_setor || "---" )
                                  } 

                                  irrigationValueTotal={
                                    getValue(dataCalc.data[index]
                                      .volume_aplicado_area_total,  dataCalc.data[index]
                                      .tempo_irrigacao_sugerido_area_total || "---" )
                                  }
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

          <ButtonsModal 
            disableButton={disableButton}
            openButtonsMOdal={openButtonsMOdal}
            setOpenButtonsModal={setOpenButtonsModal}
          />
          {isFirstAccess !== "primeiro" && <OnboardingModal />}
        </S.Container>
      )}
      {isEdit && (
        <S.CultureContainer>
          <Header
            minHeader
            minTitle={strings.CultureInfo.title}
            action={() => setIsEdit(false)}
            isFinalStep={false}
            isEdit={true}
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
                  Edição de cultura
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
                    value={
                      data_plantio &&
                      data_plantio.split("-").reverse().join("/")
                    }
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
                    value={String(cultureSelected.area_plantio)}
                    onChangeText={(value) => setArea_plantio(value)}
                  />
                </View>
                <Input
                  label={inputStrings.stage.label}
                  placeholder={inputStrings.stage.placeholder}
                  value={String(estagio_colheita)}
                  onChangeText={(value) => setEstagio_colheita(value)}
                  editable={false}
                />
                <Select
                  label={inputStrings.property.label}
                  touchableText={inputStrings.property.placeholder}
                  setValue={() => { }}
                  data={properties}
                  setId={(value) => {
                    setId_propriedade(value);
                    setSelectedEditProperty(null);
                  }}
                  stateValue={null}
                  selectedEdit={selectedEditProperty}
                  clean={null}
                />
                <Select
                  label={inputStrings.groundType.label}
                  touchableText={inputStrings.groundType.placeholder}
                  setValue={() => { }}
                  setId={(value) => {
                    setId_solo(value);
                    setSelectedEditGround(null);
                  }}
                  data={grounds}
                  stateValue={null}
                  selectedEdit={selectedEditGround}
                  clean={null}
                />
                <Select
                  label={inputStrings.bomb.label}
                  touchableText={inputStrings.bomb.placeholder}
                  setValue={() => { }}
                  setId={(value) => {
                    setId_motobomba(value);
                    setSelectedEditBomb(null);
                  }}
                  data={bombs}
                  stateValue={null}
                  selectedEdit={selectedEditBomb}
                  clean={null}
                />
                <Select
                  label={inputStrings.irrigationSystem.label}
                  touchableText={inputStrings.irrigationSystem.placeholder}
                  setValue={() => { }}
                  setId={(value) => {
                    setId_sistema_irrigacao(value);
                    setSelectedEditSystem(null);
                  }}
                  data={systems}
                  stateValue={null}
                  selectedEdit={selectedEditSystem}
                  clean={null}
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
  )
};
