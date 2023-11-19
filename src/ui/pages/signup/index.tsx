import React, { useState, useEffect } from "react";
import MaskInput from "react-native-mask-input";
import { AuthDomain } from "../../../core/domain/auth.domain";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { Typography } from "../../components/typography";
import { HeaderAuth } from "../../components/header-auth";
import { Input } from "../../components/input";
import { useMutation } from "@tanstack/react-query";
import { SignupModel } from "../../../core/models/auth";
import { AxiosError } from "axios";
import { signupValidators } from "../../../utils/validators";
import { strings } from "../../../utils";
import { ShowToast } from "../../components/toast";
import ceppromise from "cep-promise";

import * as S from "./style";

export type SignupProps = {
  auth: AuthDomain;
};

const inputStrings = strings.signup.inputs;

export const SignupScreen: React.FC<SignupProps> = ({ auth }) => {
  const navigation = useNavigation<NavigationProps>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [showLoad, setShowLoad] = useState(false);

  const validateValues = {
    nome,
    email,
    password,
    celular,
    passwordConfirm,
    cep,
    cidade,
    estado,
  };

  const submitValues = {
    nome,
    email,
    celular,
    cep,
    cidade,
    password,
    estado,
    roles: ["user"],
  };

  async function validate() {
    try {
      await signupValidators.validate(validateValues);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors,
      });
      return false;
    }
  }

  const onSignup = useMutation<SignupModel, AxiosError>({
    mutationFn: () => auth.signup(submitValues),
  });

  const onSumbit = async () => {
    if (!(await validate())) {
      return Alert.alert(status.message[0]);
    } else {
      return onSignup.mutate();
    }
  };

  useEffect(() => {
    validate();
  }, []);

  const getCep = async () => {
    setShowLoad(true);
    const cepString = cep;
    if (cepString.length < 9) {
      return;
    }
    try {
      const { city, state } = await ceppromise(
        cepString.replace(/[^0-9]+/g, "")
      );
      setCidade(city);
      setEstado(state);
      setShowLoad(false);
    } catch (e) {
      setShowLoad(false);
      Alert.alert("O CEP não foi encontrado!");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: 42,
        paddingBottom: 25,
      }}
    >
      <HeaderAuth />
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
            value={nome}
            onChangeText={(value) => setNome(value)}
          />
          <Input
            label={inputStrings.email.label}
            placeholder={inputStrings.email.placeholder}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <S.Label>{inputStrings.cel.label}</S.Label>
          <View>
            <S.ContainerInput>
              <MaskInput
                placeholder={inputStrings.cel.placeholder}
                value={celular}
                onChangeText={(value) => setCelular(value)}
                inputMode="numeric"
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
          <Input
            label={inputStrings.password.label}
            placeholder={inputStrings.password.placeholder}
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
          <View>

          <Input
            label={inputStrings.passwordConfirm.label}
            placeholder={inputStrings.passwordConfirm.placeholder}
            value={passwordConfirm}
            onChangeText={(value) => setPasswordConfirm(value)}
            secureTextEntry
            />
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
              value={cep}
              inputMode="numeric"
              onBlur={() => getCep()}
              onChangeText={(masked, unmasked) => {
                setCep(masked);
              }}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
            />
          </S.ContainerInput>
          <Input
            label={inputStrings.state.label}
            placeholder={inputStrings.state.placeholder}
            value={estado}
            onChangeText={(value) => setEstado(value)}
          />
          <Input
            label={inputStrings.city.label}
            placeholder={inputStrings.city.placeholder}
            value={cidade}
            onChangeText={(value) => setCidade(value)}
          />
          <Button
            bg-color="positive"
            style={{
              marginVertical: 30,
            }}
            loading={onSignup.isLoading}
            onPress={() => onSumbit()}
          >
            <Typography size="normal" color="pure-white" weight="bold">
              Cadastrar
            </Typography>
          </Button>
        </>
      </View>
      {onSignup.error && (
        <ShowToast message={onSignup.error.message} />
      )}
      {onSignup.isSuccess && (
        <>
          <ShowToast message="Cadastro realizado com sucesso" />
          {navigation.navigate('Login')}
        </>
      )}
    </ScrollView>
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
