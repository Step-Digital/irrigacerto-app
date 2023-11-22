import React, { useState, useEffect } from "react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Typography } from "../../components/typography";
import { Alert, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { CacheDomain } from "../../../core/domain/cache.domain";
import { useMutation } from "@tanstack/react-query";
import { LoginModel } from "../../../core/models/auth";
import { AxiosError } from "axios";
import { FlashMessage } from "../../components/flash-message";
import { BottomSheet } from "../../components/bottomsheet";
import { HeaderAuth } from "../../components/header-auth";
import { loginValidators } from '../../../utils/validators';

export type LoginProps = {
  auth: AuthDomain;
  cache: CacheDomain;
};

export const LoginScreen: React.FC<LoginProps> = ({ auth, cache }) => {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: '', message: '' })

  const validateValues = {
    email,
    password,
  }

  async function validate() {
    try {
      await loginValidators.validate(validateValues)
      return true
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.errors
      })
      return false
    }
  }


  const onLogin = useMutation<LoginModel, AxiosError>({
    mutationFn: () =>
      auth.login({
        email,
        password,
      }),
    onSuccess: async (data) => {
      await cache.set({
        key: "@token",
        value: data.data,
      });
      navigation.navigate("HomeLogged");
    },
  });

  const onSumbit = async () => {
    if (!(await validate())) {
      return Alert.alert(status.message[0])
    } else {
      return onLogin.mutate()
    }
  }

  useEffect(() => {
    validate()
  }, [email, password]);

  useEffect(() => {
    // disable swipe
    navigation.getParent()?.setOptions({ gestureEnabled: false });
    // re-enable swipe after going back
    return () => {
      navigation.getParent()?.setOptions({ gestureEnabled: true });
    };
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#FFF",
    }}>
      <HeaderAuth isLogin={true} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          marginTop: 32
        }}
      >
        <Input
          label="E-mail"
          placeholder="email@email.com.br"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          onChangeText={(e) => setEmail(e)}
          style={{
            marginBottom: 16,
          }}
        />
        <Input
          label="Senha"
          placeholder="******"
          autoComplete="password"
          value={password}
          onChangeText={(e) => setPassword(e)}
          secureTextEntry
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            marginBottom: 60,
          }}
        >
          <Button bg-color="transparent">
            <Typography
              style={{
                textDecorationLine: "underline",
              }}
              color="gray-5"
              size="normal"
              weight="bold"
            >
              Ver Termos de Uso
            </Typography>
          </Button>
          <Button
            bg-color="transparent"
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Typography
              style={{
                textDecorationLine: "underline",
              }}
              color="neutral-4"
              size="normal"
              weight="bold"
            >
              Esqueceu sua senha?
            </Typography>
          </Button>
        </View>
        <Button
          bg-color="positive"
          loading={onLogin.isLoading}
          onPress={() => onSumbit()}
        >
          <Typography color="pure-white" size="normal" weight="bold">
            Continuar
          </Typography>
        </Button>
      </View>
      {onLogin.isError && (
        <FlashMessage duration={3000} show title={onLogin.error.message} type="error" />
      )}
      <BottomSheet>
        <Typography color="neutral-4" size="huge" weight="bold">
          Bottomsheet
        </Typography>
      </BottomSheet>
    </View>
  );
};
