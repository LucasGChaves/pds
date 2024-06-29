import { Button, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { useRef, useState } from "react";
import { IAppointment } from "../../../model/appointment";
import ShowComponentByRole from "../ShowComponentByRole";
import { userTypeEnum } from "../../../enums/userTypeEnum";

interface Props {
  appointment: IAppointment;
  descriptionField: string;
  handleChangeDescription: (description: string) => void;
}

const AppointmentDescription = ({
  descriptionField,
  handleChangeDescription,
  appointment,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(
    Boolean(descriptionField)
  );

  const handleEdit = () => {
    setIsDisabled(false);
  };

  const handleSaveDescription = () => {
    // TODO: requisição de atualizar descrição
    setIsDisabled(true);
  };

  return (
    <Container>
      <Label>Descrição da consulta</Label>
      <TextInput
        value={descriptionField}
        autoFocus={!isDisabled}
        multiline
        numberOfLines={6}
        placeholder="Digite a descrição da consulta"
        onChangeText={(text) => handleChangeDescription(text)}
        disabled={isDisabled}
        style={{
          borderRadius: 8,
          borderColor: AppStyles.colors.primary30,
          borderWidth: 2,
          backgroundColor: "white",
        }}
      />
      <ShowComponentByRole role={userTypeEnum.VET}>
        <ButtonsContainer>
          <Button
            mode="contained"
            style={{ width: 90 }}
            onPress={isDisabled ? handleEdit : handleSaveDescription}
          >
            {isDisabled ? "Editar" : "Salvar"}
          </Button>
        </ButtonsContainer>
      </ShowComponentByRole>
    </Container>
  );
};

export default AppointmentDescription;

const Container = styled.View`
  row-gap: 4px;
`;

const Label = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const ButtonsContainer = styled.View`
  align-items: flex-end;
`;
