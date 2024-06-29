import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
interface Props {
  handleClick?: () => void;
  isCalendarIcon?: boolean;
}
const CircularAddButton = ({ handleClick, isCalendarIcon }: Props) => {
  if (handleClick)
    return (
      <TouchableContainer onPress={handleClick}>
        {!isCalendarIcon ? (
          <Ionicons name="add" size={40} color={AppStyles.colors.primary70} />
        ) : (
          <FontAwesome5
            name="calendar-plus"
            size={30}
            color={AppStyles.colors.primary70}
          />
        )}
      </TouchableContainer>
    );

  return (
    <Container>
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

const TouchableContainer = styled.TouchableOpacity`
  background-color: ${AppStyles.colors.primary20};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.View`
  background-color: ${AppStyles.colors.primary20};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
