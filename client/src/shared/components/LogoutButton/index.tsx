import React from "react";
import { Button } from "react-native-paper";
import AppStyles from "../../../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

interface Props {
  handleLogout: () => void;
}

const LogoutButton = ({ handleLogout }: Props) => {
  return (
    <Container>
      <ButtonContainer onPress={handleLogout}>
        <MaterialCommunityIcons
          name="logout"
          size={20}
          color={AppStyles.colors.red}
        />
        <Text>Sair</Text>
      </ButtonContainer>
    </Container>
  );
};

export default LogoutButton;

const Container = styled.View`
  position: absolute;
  top: 15px;
  right: 18px;
  z-index: 999;
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
`;
const Text = styled.Text`
  color: ${AppStyles.colors.red};
  font-size: 16px;
`;
