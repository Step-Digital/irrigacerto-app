import React, { useState } from "react";
import { HeaderAuth } from "../../components/header-auth";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { Dimensions, StyleSheet, View } from "react-native";
import { defaultTheme } from "../../theme/default";
import { Typography } from "../../components/typography";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";

export type ResetPasswordProps = {
  auth: AuthDomain;
};

export const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({ auth }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const navigation = useNavigation<NavigationProps>();

  const onRequestResetPassword = useMutation({
    mutationFn: () => auth.requestPasswordReset({ email }),
    onSuccess: (data) => {
      console.log(`REQUEST ${data}`);
      setStep(1);
    },
    onError: (err) => {
      setStep(0);
    },
  });

  const FirstStep = () => {
    return (
      <View style={styles.container}>
        <Typography
          style={styles.title}
          size="large"
          color="neutral-4"
          weight="bold"
        >
          Informe o e-mail cadastrado para alterar sua senha
        </Typography>
        <Input label="E-mail" placeholder="Informe o e-mail cadastrado" />
        <Button
          onPress={() => setStep(1)}
          bg-color="positive"
          style={{
            marginTop: 30,
          }}
        >
          <Typography size="normal" color="pure-white" weight="bold">
            Receber codigo de verificação
          </Typography>
        </Button>
      </View>
    );
  };
  const SecondStep = () => {
    return (
      <View style={styles.container}>
        <Typography
          style={styles.title}
          size="large"
          color="neutral-4"
          weight="bold"
        >
          Você deve ter recebido em seu e-mail um código
        </Typography>
        <Typography
          style={styles.subTitle}
          size="normal"
          color="neutral-4"
          weight="regular"
        >
          Digite o campo no campo abaixo para seguir adiante! Não esqueça de
          chechar a caixa de SPAM, as vezes a mensagem pode estar lá.
        </Typography>
        <Input label="Código de verificação" placeholder="Informe o código" />
        <Button
          bg-color="positive"
          onPress={() => setStep(2)}
          style={{
            marginTop: 30,
          }}
        >
          <Typography size="normal" color="pure-white" weight="bold">
            Validar código
          </Typography>
        </Button>
      </View>
    );
  };
  const ThirdStep = () => {
    return (
      <View style={styles.container}>
        <Typography
          style={styles.title}
          size="large"
          color="neutral-4"
          weight="bold"
        >
          Informe sua nova senha
        </Typography>
        <Input label="Senha" placeholder="Informe sua nova senha" />
        <Button
          bg-color="positive"
          onPress={() => navigation.navigate("Login")}
          style={{
            marginTop: 30,
          }}
        >
          <Typography size="normal" color="pure-white" weight="bold">
            Alterar senha
          </Typography>
        </Button>
      </View>
    );
  };

  return (
    <>
      <HeaderAuth hiddenBackButton={step !== 0} />
      {step === 0 && <FirstStep />}
      {step === 1 && <SecondStep />}
      {step === 2 && <ThirdStep />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultTheme.colors["pure-white"],
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 15,
  },
  subTitle: {
    marginBottom: 15,
  },
});
