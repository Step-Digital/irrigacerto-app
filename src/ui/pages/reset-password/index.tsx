import React, { useState } from "react";
import { HeaderAuth } from "../../components/header-auth";
import { HeaderAuthReset } from "../../components/header-auth-reset";
import { AuthDomain } from "../../../core/domain/auth.domain";
import { Dimensions, StyleSheet, View, TextInput } from "react-native";
import { defaultTheme } from "../../theme/default";
import { Typography } from "../../components/typography";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes/types/StackNavigationProps";
import { ShowToast } from "../../components/toast";

export type ResetPasswordProps = {
  auth: AuthDomain;
};


export const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({ auth }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation<NavigationProps>();

  const submitValues = {
    email
  }

  const submitCodeValues = {
    token: String(code),
    newPassword
  }

  const onRequestResetPassword = useMutation({
    mutationFn: () => auth.requestPasswordReset(submitValues),
    onSuccess: (data) => {
      console.log(`REQUEST ${data}`);
      setStep(1);
    },
    onError: (err) => {
      setStep(0);
    },
  });

  const onResetPassword = useMutation({
    mutationFn: () => auth.resetPassword(submitCodeValues),
    onError: (err) => {
      setStep(0);
    },
  });

  return (
    <View style={{ backgroundColor: '#fff',  flex: 1}}>
      {step === 0 && <HeaderAuth hiddenBackButton={step !== 0} isLogin />}
      {step !== 0 && <HeaderAuthReset hiddenBackButton={step !== 0} isLogin />}
      {step === 0 && <View style={styles.container}>
        <Typography
          style={styles.title}
          size="large"
          color="neutral-4"
          weight="bold"
        >
          Informe o e-mail cadastrado para alterar sua senha
        </Typography>
        <Input
          label="E-mail"
          placeholder="email@email.com.br"
          keyboardType="email-address"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <Button
          onPress={() => onRequestResetPassword.mutate()}
          bg-color="positive"
          style={{
            marginTop: 30,
          }}
        >
          <Typography size="normal" color="pure-white" weight="bold">
            Receber codigo de verificação
          </Typography>
        </Button>
      </View>}
      {step === 1 &&  <View style={styles.container}>
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
          Digite o código no campo abaixo para seguir adiante! Não esqueça de &nbsp;
          <Typography  
          size="large"
          color="neutral-4"
          weight="bold">
          checar a caixa de SPAM</Typography>, as vezes a mensagem pode estar lá.
        </Typography>
        <Input label="Código de verificação" placeholder="Informe o código" value={code}  onChangeText={(e) => setCode(e)} />
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
      </View>}
      {step === 2 && <View style={styles.container}>
        <Typography
          style={styles.title}
          size="large"
          color="neutral-4"
          weight="bold"
        >
          Informe sua nova senha
        </Typography>
        <Input secureTextEntry label="Senha" placeholder="Informe sua nova senha" value={newPassword} onChangeText={(value) => setNewPassword(value)} />
        <Button
          bg-color="positive"
          onPress={() => onResetPassword.mutate()}
          style={{
            marginTop: 30,
          }}
        >
          <Typography size="normal" color="pure-white" weight="bold">
            Alterar senha
          </Typography>
        </Button>
      </View>}
      {onResetPassword.isSuccess && (
        <>
          <ShowToast message="Senha alterada com sucesso" />
          {navigation.navigate("Login")}
        </>
      )}
    </View>
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
    marginTop: 32,
  },
  subTitle: {
    marginBottom: 15,
  },
});
