import { useState } from "react";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import TextField from "../../shared/components/TextField";
import styled from "styled-components/native";
import DatePicker from "../../shared/components/DatePicker";
import { handleChangeformData } from "../../utils/functions";
import { IVaccineRegistrationFormData } from "../../model/vaccine";
import { useSnackbarContext } from "../../shared/context/SnackbarContext";
import VaccineRepository from "../../shared/repository/vaccineRepository";

const VaccineRegistration = ({ navigation }) => {
  const [formData, setFormData] = useState<IVaccineRegistrationFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackbarParams } = useSnackbarContext();

  const onSubmit = async () => {
    if (formData) {
      const { batch, manufacturer, vaccineName, date } = formData;

      const vaccineRepository = new VaccineRepository();

      setIsLoading(true);
      try {
        await vaccineRepository.create({
          batch: batch,
          date: date,
          manufacturer: manufacturer,
          vaccineName: vaccineName,
        });
      } catch (error) {
        setSnackbarParams({
          show: true,
          text: "Erro ao cadastrar vacina. Tente novamente",
        });
      } finally {
        setIsLoading(false);
      }
    }

    navigation.navigate("Vaccines");
  };

  return (
    <LoggedAreaContainer>
      <Container>
        <ScreenTitle>Cadastro de vacina</ScreenTitle>
        <InputsContainer>
          <TextField
            value={formData?.vaccineName}
            label="Nome da vacina"
            placeholder="Insira o nome da vacina"
            handleChangeText={(text) =>
              handleChangeformData("vaccineName", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.manufacturer}
            label="Fabricante"
            placeholder="Insira o nome da empresa fabricante"
            handleChangeText={(text) =>
              handleChangeformData("manufacturer", text, formData, setFormData)
            }
          />
          <TextField
            value={formData?.batch}
            label="Lote"
            placeholder="Insira o número do lote"
            handleChangeText={(text) =>
              handleChangeformData("batch", text, formData, setFormData)
            }
          />
          <DatePicker
            handleChange={(d) =>
              handleChangeformData("date", d, formData, setFormData)
            }
            label="Data da aplicação"
            value={formData?.date}
            placeholder="Selecione a data"
            mode="outlined"
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
