import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { CacheDomain } from "../../../core/domain/cache.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { strings } from "../../../utils";
import { irrigationTypeSelect } from "../../../utils/selectValues";
import { systemValidators, RULES } from "../../../utils/validators";

import { Typography } from "../../components/typography";
import { Input } from "../../components/input";
import { ProgressBar } from "../../components/ProgressBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/button";
import { Select } from "../../components/SelectInput";

import * as S from "./style";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { IrrigationSystemDomain } from "../../../core/domain/irrigationSystem.domain";

type SystemInfoProps = {
  auth: AuthDomain;
  cache: CacheDomain;
  propertyService: NewPropertyDomain;
  irrigationSystemService: IrrigationSystemDomain;
};

const inputStrings = strings.SystemInfo.inputs;

export const SystemInfo: React.FC<SystemInfoProps> = ({
  irrigationSystemService,
  propertyService,
}) => {
  const navigation = useNavigation<NavigationProps>();
  const [systems, setSystems] = useState([]);
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
  const [status, setStatus] = useState({ type: "", message: "" });
  const [cleanGround, setCleanGround] = useState(false);

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

  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getProperties(),
  });

  const {
    data: dataSystems,
    isLoading: isLoadingSystems,
    refetch,
  } = useQuery({
    queryKey: ["irrigationSystems"],
    queryFn: () => irrigationSystemService.getSystems(),
  });

  const validateValues = {
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

  const sumbitValues = {
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
    id_propriedade:
      !isLoading && data.data[data.data.length - 1].id_propriedade,
  };

  const createSystem = useMutation<AxiosError>({
    mutationFn: () => irrigationSystemService.newIrrigationSystem(sumbitValues),
    onSuccess: (data) => {
      refetch();
      cleanSystemInputs();
    },
  });

  async function validate() {
    try {
      await systemValidators.validate(validateValues);
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
    // VER COMO PASSA VARIÁVEL PARA O USEMUTATION
    mutationFn: (id) => irrigationSystemService.deleteSystem(Number(id)),
    mutationKey: ["irrigationSystems"],
    onSuccess: (data) => {
      refetch();
    },
  });

  const onSumbit = async () => {
    if (!(await validate())) {
      return Alert.alert(status.message[0]);
    } else {
      return createSystem.mutate();
    }
  };

  if (isLoading && isLoadingSystems) return <Text>Carregando...</Text>;

  useEffect(() => {
    validate();
  }, []);

  return (
    <S.Container>
      <Header
        minHeader
        minTitle="Nova Propriedade"
        action={() => navigation.navigate("BombInfo")}
      />
      <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
        <S.ProgressBarContainer>
          <ProgressBar active width="80px" />
          <ProgressBar active width="80px" />
          <ProgressBar active width="80px" />
          <ProgressBar active width="80px" />
        </S.ProgressBarContainer>
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
              label={inputStrings.name.label}
              placeholder={inputStrings.name.placeholder}
              style={{ fontFamily: "Poppins-regular" }}
              value={nome}
              onChangeText={(value) => setNome(value)}
            />
            <Input
              label={inputStrings.efficiency.label}
              placeholder={inputStrings.efficiency.placeholder}
              value={eficiencia_irrigacao}
              onChangeText={(value) => setEficiencia_irrigacao(value)}
              inputMode="numeric"
            />
            <Input
              label={inputStrings.area.label}
              placeholder={inputStrings.area.placeholder}
              value={area_total_plantio}
              onChangeText={(value) => setArea_total_plantio(value)}
              inputMode="numeric"
            />
            <View>
              <Input
                label={inputStrings.sectorQuantity.label}
                placeholder={inputStrings.sectorQuantity.placeholder}
                value={quantidade_setores}
                onChangeText={(value) => setQuantidade_setores(value)}
                inputMode="numeric"
              />
            </View>
            <Select
              label={inputStrings.irrigationType.label}
              touchableText={inputStrings.irrigationType.placeholder}
              data={irrigationTypeSelect}
              setValue={setTipo_irrigacao}
              setId={() => {}}
              clean={cleanGround}
              stateValue={undefined}
            />

            {tipo_irrigacao === "Aspersão Convencional" && (
              <>
                <Input
                  label={inputStrings.sectorName.label}
                  placeholder={inputStrings.sectorName.placeholder}
                  value={nome_setor}
                  onChangeText={(value) => setNome_setor(value)}
                />
                <Input
                  label={inputStrings.irrigatedArea.label}
                  placeholder={inputStrings.irrigatedArea.placeholder}
                  value={area_irrigada}
                  onChangeText={(value) => setArea_irrigada(value)}
                  inputMode="numeric"
                />
                <Input
                  label={inputStrings.sprinklerFlow.label}
                  placeholder={inputStrings.sprinklerFlow.placeholder}
                  value={vazao_aspressor}
                  onChangeText={(value) => setVazao_aspressor(value)}
                  inputMode="numeric"
                />
                <Input
                  label={inputStrings.sprinklerSpace.label}
                  placeholder={inputStrings.sprinklerSpace.placeholder}
                  value={espacamento_aspressor}
                  onChangeText={(value) => setEspacamento_aspressor(value)}
                  inputMode="numeric"
                />
                <Input
                  label={inputStrings.linesSpace.label}
                  placeholder={inputStrings.linesSpace.placeholder}
                  value={espacamento_linha}
                  onChangeText={(value) => setEspacamento_linha(value)}
                  inputMode="numeric"
                />
                <Input
                  label={inputStrings.CUC.label}
                  placeholder={inputStrings.CUC.placeholder}
                  value={coeficiente_uniformidade}
                  onChangeText={(value) => setCoeficiente_uniformidade(value)}
                  inputMode="numeric"
                />
                <Input
                  label={inputStrings.efficiencySystem.label}
                  placeholder={inputStrings.efficiencySystem.placeholder}
                  value={eficiencia_sistema}
                  onChangeText={(value) => setEficiencia_sistema(value)}
                  inputMode="numeric"
                />
              </>
            )}

            {tipo_irrigacao === "Microaspersão ou Gotejamento" && (
              <>
                <Input
                  label={inputStrings.sectorName.label}
                  placeholder={inputStrings.sectorName.placeholder}
                  value={nome_setor}
                  onChangeText={(value) => setNome_setor(value)}
                />
                <Input
                  label={inputStrings.irrigatedArea.label}
                  placeholder={inputStrings.irrigatedArea.placeholder}
                  value={area_irrigada}
                  onChangeText={(value) => setArea_irrigada(value)}
                />
                <Input
                  label={inputStrings.issuerFlow.label}
                  placeholder={inputStrings.issuerFlow.placeholder}
                  value={vazao_emissor}
                  onChangeText={(value) => setVazao_emissor(value)}
                />
                <Input
                  label={inputStrings.issuerSpace.label}
                  placeholder={inputStrings.issuerSpace.placeholder}
                  value={espacamento_emissor}
                  onChangeText={(value) => setEspacamento_emissor(value)}
                />
                <Input
                  label={inputStrings.linesSpace.label}
                  placeholder={inputStrings.linesSpace.placeholder}
                  value={espacamento_linha}
                  onChangeText={(value) => setEspacamento_linha(value)}
                />
                <Input
                  label={inputStrings.CUC.label}
                  placeholder={inputStrings.CUC.placeholder}
                  value={coeficiente_uniformidade}
                  onChangeText={(value) => setCoeficiente_uniformidade(value)}
                />
                <Input
                  label={inputStrings.efficiencySystem.label}
                  placeholder={inputStrings.efficiencySystem.placeholder}
                  value={eficiencia_sistema}
                  onChangeText={(value) => setEficiencia_sistema(value)}
                />
                <Input
                  label={inputStrings.wetAreaPercentage.label}
                  placeholder={inputStrings.wetAreaPercentage.placeholder}
                  value={percentual_area_molhada}
                  onChangeText={(value) => setpercentual_area_molhada(value)}
                />
                <Input
                  label={inputStrings.shadedAreaPercentage.label}
                  placeholder={inputStrings.shadedAreaPercentage.placeholder}
                  value={percentual_area_sombreada}
                  onChangeText={(value) => setPercentual_area_sombreada(value)}
                />
              </>
            )}

            <S.AddButton onPress={() => onSumbit()}>
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
            </S.AddButton>

            {dataSystems &&
              dataSystems.data.map((item) => {
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
                          <S.InfoTextBold>{item.tipo_irrigacao}</S.InfoTextBold>
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
                        <Ionicons name="trash-outline" size={24} color="red" />
                      </TouchableOpacity>
                    </S.CardContainer>
                  );
                }
                if (item.tipo_irrigacao === "Microaspersão ou Gotejamento") {
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
                          <S.InfoTextBold>{item.tipo_irrigacao}</S.InfoTextBold>
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
                        <Ionicons name="trash-outline" size={24} color="red" />
                      </TouchableOpacity>
                    </S.CardContainer>
                  );
                }
              })}

            <Button
              onPress={() => navigation.navigate("PropertyRegistered")}
              disabled={!systems}
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
                  fontFamily: "Poppins-bold",
                  fontSize: 18,
                  width: 190,
                }}
                color="pure-white"
                size="normal"
                weight="regular"
              >
                Continuar
              </Typography>
              <AntDesign name="arrowright" size={24} color="#fff" />
            </Button>
          </View>
        </S.Content>
      </ScrollView>
    </S.Container>
  );
};
