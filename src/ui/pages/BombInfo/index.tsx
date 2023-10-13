import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { CacheDomain } from "../../../core/domain/cache.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { BombDomain } from "../../../core/domain/bomb.domain";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { strings } from "../../../utils";
import { bombValidators } from '../../../utils/validators'

import { Typography } from "../../components/typography";
import { Input } from "../../components/input";
import { ProgressBar } from "../../components/ProgressBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/button";

import * as S from './style';
import { AuthDomain } from "../../../core/domain/auth.domain";

type BombInfoProps = {
  auth: AuthDomain;
  cache: CacheDomain;
  bombService: BombDomain;
  propertyService: NewPropertyDomain;
};

const inputStrings = strings.bombInfo.inputs;

export const BombInfo:React.FC<BombInfoProps> = ({ bombService, propertyService }) => {
  const navigation = useNavigation<NavigationProps>();
  const [bombs, setBombs] = useState([]);
  const [fabricante, setFabricante] = useState('');
  const [modelo, setModelo] = useState('');
  const [potencia, setPotencia] = useState('');
  const [vazao_maxima, setVazao_maxima] = useState('');
  const [consumo, setConsumo] = useState('');
  const [valor_kw, setValor_kw] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' })

  const cleanBombsInputs = () => {
    setModelo("");
    setPotencia("");
    setVazao_maxima("");
    setFabricante("");
    setConsumo("");
    setValor_kw("");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["properties"], 
    queryFn: () => propertyService.getProperties()
  })

  const { data: dataBomb, isLoading: isLoadingBombs, refetch } = useQuery({
    queryKey: ["bombs"], 
    queryFn: () => bombService.getBombs()
  })

  const validateValues = {
    fabricante,
    modelo,
    potencia,
    vazao_maxima,
    consumo,
    valor_kw,
  }

  const sumbitValues = {
    fabricante,
    modelo,
    potencia,
    vazao_maxima: Number(vazao_maxima),
    consumo: Number(consumo),
    valor_kw: Number(valor_kw),
    ativada: true,
    id_propriedade: !isLoading && data.data[data.data.length - 1].id_propriedade,
  }
  
  async function validate() {
    try {
      await bombValidators.validate(validateValues)
      return true
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.errors
      })
      return false
    }
  } 

  const createBomb = useMutation<AxiosError>({
    mutationFn: () => bombService.newBomb(sumbitValues),
    onSuccess: () => {
      refetch()
      cleanBombsInputs()
    },
  });

  const onSumbit = async () => {
    if(!(await validate()))  {
      return Alert.alert(status.message[0])
   } else {
    return createBomb.mutate()
   }
  }

  const removeBomb = useMutation<AxiosError>({
    mutationFn: (id) => bombService.deleteBomb(Number(id)),
    mutationKey: ['bombs'],
    onSuccess: (data) => {
      refetch()
    },
  });

  useEffect(() => {
    validate()
  }, [])

  if (isLoading && isLoadingBombs) return <Text>Carregando...</Text>

  return (
    <S.Container>
      <Header minHeader minTitle="Nova Propriedade" action={() => navigation.navigate('GroundInfo')} />
      <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
      <S.ProgressBarContainer>
        <ProgressBar active width="80px" />
        <ProgressBar active width="80px" />
        <ProgressBar active width="80px" />
        <ProgressBar active={false} width="80px" />
      </S.ProgressBarContainer>
      <S.Content>
        <View>
          <Typography
            style={{
              marginTop: 24,
              fontFamily: 'Poppins-bold',
              fontSize: 22,
            }}
            color="positive"
            size="normal"
            weight="regular"
            >
              {strings.bombInfo.title}
          </Typography>
          <Input 
            label={inputStrings.manufacturer.label} 
            placeholder={inputStrings.manufacturer.placeholder}  
            value={fabricante}
            onChangeText={(value) => setFabricante(value)}
          />
          <Input 
            label={inputStrings.model.label} 
            placeholder={inputStrings.model.placeholder}   
            value={modelo}
            onChangeText={(value) => setModelo(value)}
          />
          <Input 
            label={inputStrings.power.label} 
            placeholder={inputStrings.power.placeholder}   
            value={potencia}
            onChangeText={(value) => setPotencia(value)}
            inputMode="numeric"
          />
          <View>
            <Input 
              label={inputStrings.flowRate.label} 
              placeholder={inputStrings.flowRate.placeholder}   
              value={vazao_maxima}
              onChangeText={(value) => setVazao_maxima(value)}
              inputMode="numeric"
            />
          </View>
          <View>
            <Input 
              label={inputStrings.consumption.label} 
              placeholder={inputStrings.consumption.placeholder}   
              value={consumo}
              onChangeText={(value) => setConsumo(value)}
              inputMode="numeric"
            />
            </View>
          <Input 
            label={inputStrings.value.label} 
            placeholder={inputStrings.value.placeholder}   
            value={valor_kw}
            onChangeText={(value) => setValor_kw(value)}
            inputMode="numeric"
          />

          <S.AddButton onPress={() => onSumbit()}>
              <Ionicons name="add" size={24} color="#fff" />
              <Typography
                style={{
                  fontFamily: 'Poppins-bold',
                  marginLeft: 8,
                }}
                color="pure-white"
                size="tiny"
                weight="regular"
                >
                {strings.bombInfo.addButtonn}
              </Typography>
          </S.AddButton>

          {dataBomb && dataBomb.data.map(item => (
            <S.CardContainer key={item.id_motobomba}>
              <S.CardContent>
                <S.InfoTitle>{item.modelo}</S.InfoTitle>
                <S.InfoText>Fabricante: <S.InfoTextBold>{item.fabricante}</S.InfoTextBold></S.InfoText>
                <S.InfoText>Potência: <S.InfoTextBold>{item.potencia}w</S.InfoTextBold></S.InfoText>
                <S.InfoText>Vazão Máxima: <S.InfoTextBold>{item.vazao_maxima}m³/ha</S.InfoTextBold></S.InfoText>
                <S.InfoText>Consumo: <S.InfoTextBold>{item.consumo}kw/h</S.InfoTextBold></S.InfoText>
                <S.InfoText>Valor do Kw: <S.InfoTextBold>R${item.valor_kw}</S.InfoTextBold></S.InfoText>
              </S.CardContent>
              <TouchableOpacity onPress={() => removeBomb.mutate(item.id_motobomba)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </S.CardContainer>
          ))}

          <Button 
            onPress={() => navigation.navigate('SystemInfo')}
            disabled={!bombs} 
            bg-color="positive" 
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'flex-end', 
              paddingRight: 24, 
              marginTop: 24, 
              marginBottom: 24 
            }}
          >
            <Typography
              style={{
                fontFamily: 'Poppins-regular',
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
        </View>
      </S.Content>
      </ScrollView>
    </S.Container>
    )
}