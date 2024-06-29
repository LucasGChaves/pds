import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import TextField from "../../shared/components/TextField";
import { useState } from "react";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import AppStyles from "../../styles";
import { handleChangeformData } from "../../utils/functions";

interface FormData {
  email: string;
  password: string;
}

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>();

  const handleLogin = () => {
    navigation.navigate("TabNavigator");
  };

  const handleSignUp = () => {
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
          value={formData?.email}
          label="Email"
          placeholder="Insira seu email"
          handleChangeText={(text) =>
            handleChangeformData("email", text, formData, setFormData)
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
        <Button mode="contained" style={{ width: 200 }} onPress={handleLogin}>
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
