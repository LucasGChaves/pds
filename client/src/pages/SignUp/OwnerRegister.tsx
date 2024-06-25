import { useState } from "react";
import { Button, HelperText } from "react-native-paper";
import styled from "styled-components/native";
import TextField from "../../shared/components/TextField";
import { ScreenTitle } from "../../shared/components/Title";
import BackButton from "../../shared/components/BackButton";

interface Props {
  handleBack(): void;
}

interface FormData {
  name: string;
  username: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  passwordRepetition: string;
}

const OwnerRegister = ({ handleBack }: Props) => {
  const [formData, setFormData] = useState<FormData>();
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);

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

  const onSubmit = () => {
    if (formData) {
      const {
        cpf,
        email,
        name,
        password,
        passwordRepetition,
        phone,
        username,
      } = formData;
    }
  };

  return (
    <Container>
      <BackButton handleClick={handleBack} />
      <ScreenTitle orange>Cadastro</ScreenTitle>
      <InputsContainer>
        <TextField
          label="Nome e sobrenome"
          placeholder="Insira seu nome e sobrenome"
          handleChangeText={(text) => handleChangeformData("name", text)}
        />
        <TextField
          label="Username"
          placeholder="Insira seu username"
          handleChangeText={(text) => handleChangeformData("username", text)}
        />
        <TextField
          label="CPF"
          placeholder="Insira seu CPF"
          handleChangeText={(text) => handleChangeformData("cpf", text)}
        />
        <TextField
          label="Celular"
          maskType="phone"
          placeholder="Insira seu celular"
          handleChangeText={(text) => handleChangeformData("phone", text)}
        />
        <TextField
          label="Email"
          placeholder="Insira seu email"
          handleChangeText={(text) => handleChangeformData("email", text)}
        />
        <TextField
          label="Senha"
          placeholder="Insira a senha"
          type="password"
          handleChangeText={(text) => handleChangeformData("password", text)}
        />
        <TextField
          label="Confirmação da senha"
          placeholder="Repita a senha"
          type="password"
          handleChangeText={(text) =>
            handleChangeformData("passwordRepetition", text)
          }
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
        <Button mode="contained" style={{ width: 200 }} onPress={onSubmit}>
          Cadastrar
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default OwnerRegister;

const Container = styled.View`
  padding: 0 20px;
  row-gap: 16px;
`;

const InputsContainer = styled.View`
  row-gap: 12px;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;
