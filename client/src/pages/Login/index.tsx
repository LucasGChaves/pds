import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import TextField from "../../shared/components/TextField";
import { useState } from "react";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import AppStyles from "../../styles";
import { handleChangeformData } from "../../utils/functions";
import { ILoginFormData } from "../../model/login";
import AuthRepository from "../../shared/repository/AuthRepository";
import { useSnackbarContext } from "../../shared/context/SnackbarContext";

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState<ILoginFormData>();
  const [isLoading, setIsLoading] = useState(false);

  const { setSnackbarParams } = useSnackbarContext();

  const handleLogin = async () => {
    navigation.navigate("TabNavigator");

    const { identifier, password } = formData;
    const authRepository = new AuthRepository();
    setIsLoading(true);
    try {
      await authRepository.Login({
        identifier: identifier,
        password: password,
      });
    } catch (error) {
      setSnackbarParams({
        show: true,
        text: "Ocorreu um erro ao fazer login. Tente novamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      <ScreenTitle orange>Login</ScreenTitle>
      <Image
        source={require("../../../assets/Logo.png")}
        style={{ alignSelf: "center" }}
      />
      <InputsContainer>
        <TextField
          value={formData?.identifier}
          label="Email ou CPF"
          placeholder="Insira seu email ou cpf"
          handleChangeText={(text) =>
            handleChangeformData("identifier", text, formData, setFormData)
          }
        />
        <TextField
          value={formData?.password}
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          handleChangeText={(password) =>
            handleChangeformData("password", password, formData, setFormData)
          }
        />
      </InputsContainer>
      <ButtonsContainer>
        <Button
          mode="contained"
          style={{ width: 200 }}
          onPress={handleLogin}
          loading={isLoading}
        >
          Login
        </Button>
        <Divider />
        <Button mode="contained" style={{ width: 200 }} onPress={handleSignUp}>
          Cadastro
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Login;

const Container = styled.View`
  background-color: white;
  row-gap: 60px;
`;

const InputsContainer = styled.View`
  row-gap: 6px;
  padding: 0px 20px;
`;

const ButtonsContainer = styled.View`
  align-items: center;
  row-gap: 16px;
`;

const Divider = styled.View`
  border-width: 0.5px;
  width: 90%;
  padding: 0px 20px;
  border-color: ${AppStyles.colors.primary};
  background-color: ${AppStyles.colors.primary};
`;
