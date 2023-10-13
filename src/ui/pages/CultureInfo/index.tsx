import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, View } from "react-native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import MaskInput from "react-native-mask-input";
import moment from "moment";
import { Image } from "expo-image";

import { strings } from "../../../utils";
import { cultureValidators } from "../../../utils/validators";

import { Header } from "../../components/Header";
import { ProgressBar } from "../../components/ProgressBar";
import { Typography } from "../../components/typography";
import { Input } from "../../components/input";
import { Select } from "../../components/SelectInput";
import { Button } from "../../components/button";
import * as S from "./style";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { CacheDomain } from "../../../core/domain/cache.domain";
import { CultureDomain } from "../../../core/domain/culture.domain";
import { GroundDomain } from "../../../core/domain/ground.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { BombDomain } from "../../../core/domain/bomb.domain";
import { IrrigationSystemDomain } from "../../../core/domain/irrigationSystem.domain";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CategoryCard } from "../../components/CategoryCard";

type CultureInfoProps = {
  auth: AuthDomain;
  cache: CacheDomain;
  propertyService: NewPropertyDomain;
  cultureService: CultureDomain;
  groundService: GroundDomain;
  irrigationSystemService: IrrigationSystemDomain;
  bombService: BombDomain;
};

type SelectedCultureProps = {
  nome: string;
  segmento: string;
  perene: boolean;
  temporaria: boolean;
  profundidade_sistema_radicular: number;
  fator: number;
  estagio1: number;
  duracao_estagio1: number;
  estagio2: number;
  duracao_estagio2: number;
  estagio3: number;
  duracao_estagio3: number;
  estagio4: number;
  duracao_estagio4: number;
  id_dados_cultura: number;
};

const inputStrings = strings.CultureInfo.inputs;

export const CultureInfo: React.FC<CultureInfoProps> = ({
  cultureService,
  propertyService,
  groundService,
  bombService,
  irrigationSystemService,
}) => {
  const navigation = useNavigation<NavigationProps>();
  const [nome_cultura, setNome_cultura] = useState("");
  const [data_plantio, setData_plantio] = useState("");
  const [area_plantio, setArea_plantio] = useState("");
  const [setores, setSetores] = useState("");
  const [estagio_colheita, setEstagio_colheita] = useState("");
  const [id_dados_cultura, serId_dados_cultura] = useState("");
  const [id_propriedade, setId_propriedade] = useState("");
  const [id_sistema_irrigacao, setId_sistema_irrigacao] = useState("");
  const [id_motobomba, setId_motobomba] = useState("");
  const [id_solo, setId_solo] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [cultureStep, setCultureStep] = useState(1);
  const [cultureSelected, setCultureSelected] = useState<SelectedCultureProps>({
    nome: "",
    segmento: "",
    perene: true,
    temporaria: true,
    profundidade_sistema_radicular: 0,
    fator: 0,
    estagio1: 0,
    duracao_estagio1: 0,
    estagio2: 0,
    duracao_estagio2: 0,
    estagio3: 0,
    duracao_estagio3: 0,
    estagio4: 0,
    duracao_estagio4: 0,
    id_dados_cultura: 0,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getProperties(),
  });

  const {
    data: dataCulture,
    isLoading: isLoadingCulture,
    refetch,
  } = useQuery({
    queryKey: ["cultures"],
    queryFn: () => cultureService.getCulturesData(),
  });

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

  const validateValues = {
    nome_cultura,
    data_plantio,
    area_plantio,
    setores,
    estagio_colheita,
    id_dados_cultura: cultureSelected.id_dados_cultura,
    id_propriedade,
    id_sistema_irrigacao,
    id_motobomba,
    id_solo,
  };

  const sumbitValues = {
    nome_cultura,
    data_plantio: data_plantio.split("/").reverse().join("-"),
    area_plantio,
    setores,
    estagio_colheita,
    id_dados_cultura: Number(cultureSelected.id_dados_cultura),
    id_propriedade: Number(id_propriedade),
    id_sistema_irrigacao: Number(id_sistema_irrigacao),
    id_motobomba: Number(id_motobomba),
    id_solo: Number(id_solo),
  };

  async function validate() {
    try {
      await cultureValidators.validate(validateValues);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors,
      });
      return false;
    }
  }

  const createCulture = useMutation<AxiosError>({
    mutationFn: () => cultureService.newCulture(sumbitValues),
    onSuccess: () => {
      navigation.navigate("CultureRegistered");
    },
  });

  const onSumbit = async () => {
    if (!(await validate())) {
      return Alert.alert(status.message[0]);
    } else {
      return createCulture.mutate();
    }
  };

  function selectCulture(item) {
    setCultureSelected(item);
    setCultureStep(2);
  }

  const totalStage3 =  cultureSelected.duracao_estagio1 +
  cultureSelected.duracao_estagio2 +
  cultureSelected.duracao_estagio3

  const totalStage2 =  cultureSelected.duracao_estagio1 +
  cultureSelected.duracao_estagio2

  const totalStage1 =  cultureSelected.duracao_estagio1

  function setStage() {
    var initialDate = data_plantio;
    var dateNow = new Date();
    var diff = moment(dateNow, "DD/MM/YYYY").diff(
      moment(initialDate, "DD/MM/YYYY")
    );
    var days = moment.duration(diff).asDays();
  console.log("days", days)


    if (
      days >
      totalStage3
    ) {
      return setEstagio_colheita('4');
    } else if (days <= totalStage3 && days > totalStage2) {
      return setEstagio_colheita('3');
    } else if ( days <= totalStage2 && days > totalStage1) {
      return setEstagio_colheita('2');
    }  else {
      return setEstagio_colheita('1');
    }
  }

  useEffect(() => {
    validate();
  }, []);

  if (cultureStep === 1) {
    return (
      <S.Container>
        <Header
          minHeader
          minTitle={strings.CultureInfo.title}
          action={() => navigation.navigate("HomeLogged")}
          isFinalStep={false}
        />
        <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
          <S.ProgressBarContainer>
            <ProgressBar active width="176px" />
            <ProgressBar active={false} width="176px" />
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
              {strings.CultureInfo.subTitle}
            </Typography>
            <Input
              label={inputStrings.search.label}
              placeholder={inputStrings.search.placeholder}
            />
            <S.CategoryTitle>
              {strings.CultureInfo.category.hotalicas}
            </S.CategoryTitle>
            {dataCulture &&
              dataCulture.data.map((item) => {
                if (item.segmento === "Hortaliça") {
                  return (
                    <S.CategoryContainer key={item.nome}>
                      <S.CategoryButton  onPress={() => selectCulture(item)}>
                        <CategoryCard text={item.nome} image={item.image_url} />
                      </S.CategoryButton>
                    </S.CategoryContainer>
                  );
                }
              })}
            <S.CategoryTitle>
              {strings.CultureInfo.category.frutíferas}
            </S.CategoryTitle>
            {dataCulture &&
              dataCulture.data.map((item) => {
                if (item.segmento === "Frutífera") {
                  return (
                    <S.CategoryContainer key={item.nome}>
                      <S.CategoryButton  onPress={() => selectCulture(item)}>
                        <CategoryCard text={item.nome}  image={item.image_url}  />
                      </S.CategoryButton>
                    </S.CategoryContainer>
                  );
                }
              })}
            <S.CategoryTitle>
              {strings.CultureInfo.category.grãosecereais}
            </S.CategoryTitle>
            {dataCulture &&
              dataCulture.data.map((item) => {
                if (item.segmento === "Grão" || item.segmento === "Cereal") {
                  return (
                    <S.CategoryContainer key={item.nome}>
                      <S.CategoryButton onPress={() => selectCulture(item)}>
                        <CategoryCard text={item.nome}  image={item.image_url}  />
                      </S.CategoryButton>
                    </S.CategoryContainer>
                  );
                }
              })}
            <S.CategoryTitle>
              {strings.CultureInfo.category.raiz}
            </S.CategoryTitle>
            {dataCulture &&
              dataCulture.data.map((item) => {
                if (item.segmento === "Raiz") {
                  return (
                    <S.CategoryContainer key={item.nome}>
                      <S.CategoryButton onPress={() => selectCulture(item)}>
                        <CategoryCard text={item.nome}  image={item.image_url}  />
                      </S.CategoryButton>
                    </S.CategoryContainer>
                  );
                }
              })}
            <S.CategoryTitle>
              {strings.CultureInfo.category.pastagem}
            </S.CategoryTitle>
            {dataCulture &&
              dataCulture.data.map((item) => {
                if (item.segmento === "Pastagem") {
                  return (
                    <S.CategoryContainer key={item.nome}>
                      <S.CategoryButton onPress={() => selectCulture(item)}>
                        <CategoryCard text={item.nome}  image={item.image_url}  />
                      </S.CategoryButton>
                    </S.CategoryContainer>
                  );
                }
              })}
            <S.CategoryTitle>
              {strings.CultureInfo.category.capineira}
            </S.CategoryTitle>
            {dataCulture &&
              dataCulture.data.map((item) => {
                if (item.segmento === "Capineira") {
                  return (
                    <S.CategoryContainer key={item.nome}>
                      <S.CategoryButton onPress={() => selectCulture(item)}>
                        <CategoryCard text={item.nome}  image={item.image_url}  />
                      </S.CategoryButton>
                    </S.CategoryContainer>
                  );
                }
              })}
          </S.Content>
        </ScrollView>
      </S.Container>
    );
  }
  if (cultureStep === 2) {
    return (
      <S.Container>
        <Header
          minHeader
          minTitle={strings.CultureInfo.title}
          action={() => setCultureStep(1)}
          isFinalStep={false}
        />
        <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
          <View>
            <S.ProgressBarContainer>
              <ProgressBar active width="176px" />
              <ProgressBar active width="176px" />
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
                {strings.CultureInfo.subTitle}
              </Typography>
              <Input
                label={inputStrings.culture.label}
                placeholder={inputStrings.culture.placeholder}
                value={cultureSelected.nome}
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
                  onBlur={() => setStage()}
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
                setId={setId_propriedade}
                stateValue={null}
              />
              <Select
                label={inputStrings.groundType.label}
                touchableText={inputStrings.groundType.placeholder}
                setValue={() => {}}
                setId={setId_solo}
                data={grounds}
                stateValue={null}
              />
              <Select
                label={inputStrings.bomb.label}
                touchableText={inputStrings.bomb.placeholder}
                setValue={() => {}}
                setId={setId_motobomba}
                data={bombs}
                stateValue={null}
              />
              <Select
                label={inputStrings.irrigationSystem.label}
                touchableText={inputStrings.irrigationSystem.placeholder}
                setValue={() => {}}
                setId={setId_sistema_irrigacao}
                data={systems}
                stateValue={null}
              />
              <Button
                onPress={() => onSumbit()}
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
            </S.Content>
          </View>
        </ScrollView>
      </S.Container>
    );
  }
};
