import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
interface Props {
  handleClick: () => void;
  isCalendarIcon?: boolean;
}
const CircularAddButton = ({ handleClick, isCalendarIcon }: Props) => {
  return (
    <Container onPress={handleClick}>
      {!isCalendarIcon ? (
        <Ionicons name="add" size={40} color={AppStyles.colors.primary70} />
      ) : (
        <FontAwesome5
          name="calendar-plus"
          size={30}
          color={AppStyles.colors.primary70}
        />
      )}
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
