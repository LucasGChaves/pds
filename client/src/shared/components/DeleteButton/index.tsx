import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import AppStyles from "../../../styles";

interface Props {
  handleDelete(): void;
}

const DeleteButton = ({ handleDelete }: Props) => {
  return (
    <Container>
      <ButtonContainer onPress={handleDelete}>
        <FontAwesome name="trash-o" size={20} color={AppStyles.colors.red} />
        <Text>Excluir</Text>
      </ButtonContainer>
    </Container>
  );
};

export default DeleteButton;

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
`;
