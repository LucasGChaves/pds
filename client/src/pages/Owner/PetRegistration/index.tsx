import {
  useNavigation,
  ParamListBase,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import { useState } from "react";
import LoggedAreaContainer from "../../../shared/components/LoggedAreaContainer";
import { Button, Icon } from "react-native-paper";
import { ScreenTitle } from "../../../shared/components/Title";
import TextField from "../../../shared/components/TextField";
import styled from "styled-components/native";
import { DatePickerInput } from "react-native-paper-dates";
import DatePicker from "../../../shared/components/DatePicker";
import UploadButton from "../../../shared/components/UploadButton";
interface FormData {
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
  photo: string;
}

const PetRegistration = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>();

  const route = useRoute();
  // route.params.dado

  const handleChangeformData = (prop: string, value: string | Date) => {
    setFormData({
      ...formData,
      [prop]: value,
    });
  };

  const onSubmit = () => {
    if (formData) {
      const { birthDate, breed, name, photo, species } = formData;
    }

    navigation.navigate("MyPets");
  };

  const handleUploadPhoto = () => {};

  return (
    <LoggedAreaContainer>
      <Container>
        <ScreenTitle orange>Cadastro de pet</ScreenTitle>
        <InputsContainer>
          <TextField
            label="Nome"
            placeholder="Insira o nome do pet"
            handleChangeText={(text) => handleChangeformData("name", text)}
          />
          <TextField
            label="Espécie"
            placeholder="Insira a espécie do pet"
            handleChangeText={(text) => handleChangeformData("species", text)}
          />
          <TextField
            label="Raça"
            placeholder="Insira a raça do pet"
            handleChangeText={(text) => handleChangeformData("breed", text)}
          />
          <DatePicker
            handleChange={(d) => handleChangeformData("birthDate", d)}
            label="Data de nascimento"
            value={formData?.birthDate}
            placeholder="Selecione a data"
            mode="outlined"
          />
        </InputsContainer>
        <ButtonContainer>
          <UploadButton handleClick={handleUploadPhoto} />
          <Button mode="contained" style={{ width: 200 }} onPress={onSubmit}>
            Cadastrar
          </Button>
        </ButtonContainer>
      </Container>
    </LoggedAreaContainer>
  );
};

export default PetRegistration;

const Container = styled.View`
  row-gap: 32px;
`;

const InputsContainer = styled.View`
  row-gap: 12px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  row-gap: 150px;
`;
