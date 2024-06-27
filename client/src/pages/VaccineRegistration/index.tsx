import { useState } from "react";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import TextField from "../../shared/components/TextField";
import styled from "styled-components/native";

interface FormData {
  vaccineName: string;
  manufacturer: string;
  batch: string;
}

const VaccineRegistration = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>();

  const handleChangeformData = (prop: string, value: string | Date) => {
    setFormData({
      ...formData,
      [prop]: value,
    });
  };

  const onSubmit = () => {
    if (formData) {
      const { batch, manufacturer, vaccineName } = formData;
    }

    navigation.navigate("Vaccines");
  };

  return (
    <LoggedAreaContainer>
      <Container>
        <ScreenTitle>Cadastro de vacina</ScreenTitle>
        <InputsContainer>
          <TextField
            label="Nome da vacina"
            placeholder="Insira o nome da vacina"
            handleChangeText={(text) =>
              handleChangeformData("vaccineName", text)
            }
          />
          <TextField
            label="Fabricante"
            placeholder="Insira o nome da empresa fabricante"
            handleChangeText={(text) =>
              handleChangeformData("manufacturer", text)
            }
          />
          <TextField
            label="Lote"
            placeholder="Insira o número do lote"
            handleChangeText={(text) => handleChangeformData("batch", text)}
          />
        </InputsContainer>
        <ButtonContainer>
          <Button mode="contained" style={{ width: 200 }} onPress={onSubmit}>
            Cadastrar
          </Button>
        </ButtonContainer>
      </Container>
    </LoggedAreaContainer>
  );
};

export default VaccineRegistration;

const Container = styled.View`
  row-gap: 40px;
  margin-top: 8px;
`;

const InputsContainer = styled.View`
  row-gap: 12px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 40px;
`;
