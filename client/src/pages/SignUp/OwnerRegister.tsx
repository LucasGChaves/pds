import { useState } from "react";
import { Button, HelperText } from "react-native-paper";
import styled from "styled-components/native";
import TextField from "../../shared/components/TextField";
import { ScreenTitle } from "../../shared/components/Title";
import BackButton from "../../shared/components/BackButton";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";
import { IOwnerRegisterFormData } from "../../model/user";
import { useSnackbarContext } from "../../shared/context/SnackbarContext";
import AuthRepository from "../../shared/repository/AuthRepository";

interface Props {
  handleBack(): void;
}

const OwnerRegister = ({ handleBack }: Props) => {
  const [formData, setFormData] = useState<IOwnerRegisterFormData>();
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const { setSnackbarParams } = useSnackbarContext();

  const handleChangeformData = (prop: string, value: string) => {
    setFormData({
      ...formData,
      [prop]: value,
    });
    if (formData) {
      const { password, passwordRepetition } = formData;
      if (
        password != undefined &&
        passwordRepetition != undefined &&
        password != passwordRepetition
      ) {
        setPasswordsAreNotEqual(true);
      } else {
        setPasswordsAreNotEqual(false);
      }
    }
  };

  const onSubmit = async () => {
    if (formData) {
      const authRepository = new AuthRepository();
      const { cpf, email, name, lastName, password, phone } = formData;

      setIsLoading(true);
      try {
        await authRepository.RegisterOwner({
          cpf: cpf,
          email: email,
          lastName: lastName,
          name: name,
          password: password,
          phone: phone,
        });
      } catch (error) {
        setSnackbarParams({
          show: true,
          text: "Ocorreu um erro ao fazer cadastro. Tente novamente",
        });
      } finally {
        setIsLoading(false);
      }
    }

    navigation.navigate("TabNavigator");
  };

  return (
    <Container>
      <BackButton handleClick={handleBack} />
      <ScreenTitle orange>Cadastro</ScreenTitle>
      <InputsContainer>
        <TextField
          label="Nome"
          placeholder="Insira seu nome"
          handleChangeText={(text) => handleChangeformData("name", text)}
          value={formData?.name}
        />
        <TextField
          label="Último nome"
          placeholder="Insira seu último nome"
          handleChangeText={(text) => handleChangeformData("lastName", text)}
          value={formData?.lastName}
        />
        <TextField
          label="CPF"
          placeholder="Insira seu CPF"
          handleChangeText={(text) => handleChangeformData("cpf", text)}
          value={formData?.cpf}
        />
        <TextField
          label="Celular"
          maskType="phone"
          placeholder="Insira seu celular"
          handleChangeText={(text) => handleChangeformData("phone", text)}
          value={formData?.phone}
        />
        <TextField
          label="Email"
          placeholder="Insira seu email"
          handleChangeText={(text) => handleChangeformData("email", text)}
          value={formData?.email}
        />
        <TextField
          label="Senha"
          placeholder="Insira a senha"
          type="password"
          handleChangeText={(text) => handleChangeformData("password", text)}
          value={formData?.password}
        />
        <TextField
          label="Confirmação da senha"
          placeholder="Repita a senha"
          type="password"
          handleChangeText={(text) =>
            handleChangeformData("passwordRepetition", text)
          }
          value={formData?.passwordRepetition}
        />
        <HelperText
          type="error"
          style={{ fontSize: 16 }}
          visible={passwordsAreNotEqual}
        >
          As senhas não coincidem!
        </HelperText>
      </InputsContainer>
      <ButtonContainer>
        <Button
          mode="contained"
          style={{ width: 200 }}
          onPress={onSubmit}
          loading={isLoading}
        >
          Cadastrar
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default OwnerRegister;

const Container = styled.View`
  margin-top: 8px;
  padding: 0 20px;
  row-gap: 16px;
`;

const InputsContainer = styled.View`
  row-gap: 12px;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;
