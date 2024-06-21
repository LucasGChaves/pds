import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { Ionicons } from "@expo/vector-icons";
interface Props {
  handleClick: () => void;
}
const CircularAddButton = ({ handleClick }: Props) => {
  return (
    <Container onPress={handleClick}>
      <Ionicons name="add" size={40} color={AppStyles.colors.primary70} />
    </Container>
  );
};

export default CircularAddButton;

const Container = styled.TouchableOpacity`
  background-color: ${AppStyles.colors.primary20};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
