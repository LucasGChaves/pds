import { useState } from "react";
import styled from "styled-components/native";
import AppStyles from "../../styles";
import BackButton from "../../shared/components/BackButton";
import Select from "../../shared/components/Select";
import { userTypeEnum } from "../../enums/userTypeEnum";
import { Button } from "react-native-paper";

interface Props {
  handleChangeSelectValue(value: string): void;
  selectValue: string;
  handleNextPage(): void;
  handleBack(): void;
}

const UserTypeSelectionPage = ({
  handleNextPage,
  handleChangeSelectValue,
  selectValue,
  handleBack,
}: Props) => {
  const userTypes = [
    {
      label: userTypeEnum.OWNER_LABEL,
      value: userTypeEnum.OWNER,
    },
    {
      label: userTypeEnum.VET_LABEL,
      value: userTypeEnum.VET,
    },
  ];

  return (
    <Container>
      <BackButton handleClick={handleBack} />
      <Content>
        <SelectContainer>
          <Text>Selecione o tipo de usuário que deseja cadastrar</Text>
          <Select
            data={userTypes}
            label="Tipo de usuário"
            placeholder="Selecione o tipo de usuário"
            handleChangeValue={handleChangeSelectValue}
            value={selectValue}
          />
        </SelectContainer>
        <Button
          mode="contained"
          style={{ width: 200 }}
          onPress={handleNextPage}
        >
          Avançar
        </Button>
      </Content>
    </Container>
  );
};

export default UserTypeSelectionPage;

const Container = styled.View`
  justify-content: center;
  flex: 1;
  padding: 0 20px;
  align-items: center;
`;

const Text = styled.Text`
  color: ${AppStyles.colors.primary};
  font-size: 20px;
  text-align: left;
`;

const SelectContainer = styled.View`
  row-gap: 8px;
`;

const Content = styled.View`
  row-gap: 52px;
  align-items: center;
`;
