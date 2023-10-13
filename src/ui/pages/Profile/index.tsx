import React, { useState, useEffect } from "react";
import MaskInput from "react-native-mask-input";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { NewPropertyDomain } from "../../../core/domain/newProperty.domain";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { Typography } from "../../components/typography";
import { Input } from "../../components/input";
import { useQuery } from "@tanstack/react-query";
import { strings } from "../../../utils";

import * as S from "./style";
import { Header } from "../../components/Header";

export type ProfileProps = {
  auth: AuthDomain;
  propertyService: NewPropertyDomain;
};

const inputStrings = strings.signup.inputs;

export const Profile: React.FC<ProfileProps> = ({ auth, propertyService }) => {
  const navigation = useNavigation<NavigationProps>();
  const [cep, setCep] = useState("");
  const [allData, setAllData] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["AllProperties"],
    queryFn: () => propertyService.getAllPropertiesData(),
  });

  console.log("data prfile", JSON.stringify(data, null, 2));

  useEffect(() => {
    if (!isLoading) {
      setAllData(data.data);
    }
  }, []);

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <>
      <Header
        minTitle="Meu Perfil"
        minHeader
        action={() => navigation.navigate("Menu")}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingTop: 25,
          paddingBottom: 25,
        }}
      >
        <View style={styles.form}>
          <>
            <Typography
              style={{
                marginVertical: 15,
                fontFamily: "Poppins-bold",
              }}
              color="positive"
              size="huge"
              weight="regular"
            >
              {strings.signup.title}
            </Typography>
            <Input
              label={inputStrings.name.label}
              placeholder={inputStrings.name.placeholder}
              value={(data && data.data[0].user.nome) || "---"}
              editable={false}
              style={{ color: "black" }}
            />
            <Input
              label={inputStrings.email.label}
              placeholder={inputStrings.email.placeholder}
              value={(data && data.data[0].user.email) || "---"}
              editable={false}
              style={{ color: "black" }}
            />
            <S.Label>{inputStrings.phone1.label}</S.Label>
            <S.ContainerInput>
              <MaskInput
                value={(data && data.data[0].user.telefone1) || "---"}
                editable={false}
                style={{ color: "black" }}
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            </S.ContainerInput>
            <S.Label>{inputStrings.phone2.label}</S.Label>
            <View>
              <S.ContainerInput>
                <MaskInput
                  value={(data && data.data[0].user.telefone2) || "---"}
                  editable={false}
                  style={{ color: "black" }}
                  mask={[
                    "(",
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                />
              </S.ContainerInput>
            </View>
            <S.Label>{inputStrings.cel.label}</S.Label>
            <View>
              <S.ContainerInput>
                <MaskInput
                  placeholder={inputStrings.cel.placeholder}
                  value={(data && data.data[0].user.celular) || "---"}
                  editable={false}
                  style={{ color: "black" }}
                  mask={[
                    "(",
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                />
              </S.ContainerInput>
            </View>
            <Typography
              style={{
                marginVertical: 15,
                fontFamily: "Poppins-bold",
              }}
              color="positive"
              size="huge"
              weight="regular"
            >
              Endereço
            </Typography>
            <S.Label>{inputStrings.cep.label}</S.Label>
            <S.ContainerInput>
              <MaskInput
                placeholder={inputStrings.cep.placeholder}
                value={data && data.data[0].cep}
                style={{ color: "black" }}
                editable={false}
                onChangeText={(masked, unmasked) => {
                  setCep(masked);
                }}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
              />
            </S.ContainerInput>
            <Input
              label={inputStrings.street.label}
              placeholder={inputStrings.street.placeholder}
              value={(data && data.data[0].user.logradouro) || "---"}
              editable={false}
              style={{ color: "black" }}
            />
            <Input
              label={inputStrings.number.label}
              placeholder={inputStrings.number.placeholder}
              value={(data && data.data[0].user.numero) || "---"}
              editable={false}
              style={{ color: "black" }}
            />
            <Input
              label={inputStrings.neighbor.label}
              placeholder={inputStrings.neighbor.placeholder}
              value={(data && data.data[0].user.bairro) || "---"}
              style={{ color: "black" }}
              editable={false}
            />
            <Input
              label={inputStrings.complement.label}
              placeholder={inputStrings.complement.placeholder}
              value={(data && data.data[0].user.complemento) || "---"}
              style={{ color: "black" }}
              editable={false}
            />
            <Input
              label={inputStrings.state.label}
              placeholder={inputStrings.state.placeholder}
              value={(data && data.data[0].user.estado) || "---"}
              style={{ color: "black" }}
              editable={false}
            />
            <Input
              label={inputStrings.city.label}
              placeholder={inputStrings.city.placeholder}
              value={(data && data.data[0].user.cidade) || "---"}
              style={{ color: "black" }}
              editable={false}
            />
          </>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  form: {
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
