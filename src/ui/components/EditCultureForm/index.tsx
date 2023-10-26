import React from "react";
import { ScrollView, View } from "react-native";
import { Input } from "../input";
import { Select } from "../SelectInput";
import { Button } from "../button";
import { Typography } from "../typography";
import MaskInput from "react-native-mask-input";

import * as S from './styles'
import { Header } from "../Header";
import { strings } from "../../../utils";

const inputStrings = strings.CultureInfo.inputs;

export const EditCultureForm = ({
  setIsEdit,
  cultureSelected,
  nome_cultura,
  setNome_cultura,
  data_plantio,
  setData_plantio,
  setArea_plantio,
  setores,
  setSetores,
  estagio_colheita,
  setEstagio_colheita,
  properties,
  setId_propriedade,
  setSelectedEditProperty,
  selectedEditProperty,
  setId_solo,
  grounds,
  selectedEditGround,
  setId_motobomba,
  setSelectedEditBomb,
  bombs,
  selectedEditBomb,
  setId_sistema_irrigacao,
  setSelectedEditSystem,
  systems,
  selectedEditSystem,
  editCulture
}) => {
  return (
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
              setValue={() => { }}
              data={properties}
              setId={() => {
                setId_propriedade();
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
              setId={setId_solo}
              data={grounds}
              stateValue={null}
              selectedEdit={selectedEditGround}
              clean={null}
            />
            <Select
              label={inputStrings.bomb.label}
              touchableText={inputStrings.bomb.placeholder}
              setValue={() => { }}
              setId={() => {
                setId_motobomba();
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
              setId={() => {
                setId_sistema_irrigacao;
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
  )
}