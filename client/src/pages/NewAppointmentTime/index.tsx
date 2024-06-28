import { useState } from "react";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import { Button } from "react-native-paper";
import { ScreenTitle } from "../../shared/components/Title";
import styled from "styled-components/native";
import DatePicker from "../../shared/components/DatePicker";
import Select from "../../shared/components/Select";
import { times } from "../../utils/horarios";

interface FormData {
  date: Date;
  time: string;
}

const NewAppointmentTime = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>();

  const handleChangeformData = (prop: string, value: string | Date) => {
    setFormData({
      ...formData,
      [prop]: value,
    });
  };

  const onSubmit = () => {
    if (formData) {
      const { date, time } = formData;
    }

    navigation.navigate("Pets");
  };

  return (
    <LoggedAreaContainer>
      <Container>
        <ScreenTitle orange>Novo horário</ScreenTitle>
        <InputsContainer>
          <DatePicker
            handleChange={(date) => handleChangeformData("date", date)}
            label="Data da consulta"
            value={formData?.date}
            placeholder="Selecione a data"
            mode="outlined"
          />
          <Select
            data={times}
            handleChangeValue={(time) => handleChangeformData("time", time)}
            label="Horário"
            placeholder="Selecione o horário"
            value={formData?.time}
          />
        </InputsContainer>
        <ButtonContainer>
          <Button mode="contained" style={{ width: 200 }} onPress={onSubmit}>
            Confirmar
          </Button>
        </ButtonContainer>
      </Container>
    </LoggedAreaContainer>
  );
};

export default NewAppointmentTime;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 32px;
`;

const InputsContainer = styled.View`
  row-gap: 12px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 32px;
`;
