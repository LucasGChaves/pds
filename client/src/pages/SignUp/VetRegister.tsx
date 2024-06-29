import { useState } from "react";
import { Button, HelperText } from "react-native-paper";
import styled from "styled-components/native";
import TextField from "../../shared/components/TextField";
import { ScreenTitle } from "../../shared/components/Title";
import BackButton from "../../shared/components/BackButton";
import Select from "../../shared/components/Select";
import { BRASILIAN_STATES } from "../../utils/constants";

interface Props {
  handleBack(): void;
}

interface FormData {
  name: string;
  lastName: string;
  cpf: string;
  crmv: string;
  phone: string;
  email: string;
  password: string;
  passwordRepetition: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
}

const VetRegister = ({ handleBack }: Props) => {
  const [formData, setFormData] = useState<FormData>();
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);
  const [isSecondPart, setIsSecondPart] = useState(false);

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
        lastName,
        password,
        passwordRepetition,
        phone,
        crmv,
      } = formData;
    }
  };

  const handleButtonClick = () => {
    if (isSecondPart) {
      onSubmit();
      return;
    }

    setIsSecondPart(true);
  };

  const handleBackButton = () => {
    if (isSecondPart) {
      setIsSecondPart(false);
      return;
    }

    handleBack();
  };

  return (
    <Container>
      <BackButton handleClick={handleBackButton} />
      <ScreenTitle orange>Cadastro</ScreenTitle>
      <InputsContainer>
        {!isSecondPart ? (
          <>
            <TextField
              label="CRMV"
              placeholder="Insira seu CRMV"
              handleChangeText={(text) => handleChangeformData("crmv", text)}
              value={formData?.crmv}
            />
            <Select
              data={BRASILIAN_STATES}
              label="Estado"
              placeholder="Selecione o estado"
              handleChangeValue={(value) =>
                handleChangeformData("state", value)
              }
              value={formData?.state}
            />
            <TextField
              label="Cidade"
              placeholder="Insira sua cidade"
              handleChangeText={(text) => handleChangeformData("city", text)}
              value={formData?.city}
            />
            <TextField
              label="Bairro"
              placeholder="Insira seu bairro"
              handleChangeText={(text) =>
                handleChangeformData("district", text)
              }
              value={formData?.district}
            />
            <TextField
              label="Logradouro"
              placeholder="Insira seu logradouro"
              handleChangeText={(text) => handleChangeformData("street", text)}
              value={formData?.district}
            />
            <TextField
              label="Número"
              placeholder="Insira seu número"
              handleChangeText={(text) => handleChangeformData("number", text)}
              value={formData?.number}
            />
          </>
        ) : (
          <>
            <TextField
              label="Nome"
              placeholder="Insira seu nome"
              handleChangeText={(text) => handleChangeformData("name", text)}
              value={formData?.name}
            />
            <TextField
              label="Último nome"
              placeholder="Insira seu último nome"
              handleChangeText={(text) =>
                handleChangeformData("lastName", text)
              }
              value={formData?.name}
            />
            <TextField
              label="CPF"
              placeholder="Insira seu CPF"
              handleChangeText={(text) => handleChangeformData("cpf", text)}
              value={formData?.cpf}
            />
            <TextField
              label="Email"
              placeholder="Insira seu email"
              handleChangeText={(text) => handleChangeformData("email", text)}
              value={formData?.email}
            />

            <TextField
              label="Celular"
              maskType="phone"
              placeholder="Insira seu celular"
              handleChangeText={(text) => handleChangeformData("phone", text)}
              value={formData?.phone}
            />
            <TextField
              label="Senha"
              placeholder="Insira a senha"
              type="password"
              handleChangeText={(text) =>
                handleChangeformData("password", text)
              }
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
          </>
        )}

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
          onPress={handleButtonClick}
        >
          {isSecondPart ? "Cadastrar" : "Avançar"}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default VetRegister;

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
