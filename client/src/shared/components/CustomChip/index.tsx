import styled from "styled-components/native";
import AppStyles from "../../../styles";
import { View } from "react-native";
interface Props {
  color: "green" | "orange" | "blue";
  icon?: React.ReactNode;
  text: string;
}
const CustomChip = ({ color, text, icon }: Props) => {
  const getContainerColor = () => {
    switch (color) {
      case "green":
        return AppStyles.colors.lightGreen;
      case "blue":
        return AppStyles.colors.blue;
      case "orange":
        return AppStyles.colors.primary30;
    }
  };

  return (
    <View style={{ alignItems: "baseline" }}>
      <Container color={getContainerColor()}>
        {icon && icon}
        <Content>{text}</Content>
      </Container>
    </View>
  );
};

export default CustomChip;

interface ContainerProps {
  color: string;
}
const Container = styled.View<ContainerProps>`
  border-radius: 50px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
  background-color: ${(props) => props.color};
  padding: 4px 16px;
`;

const Content = styled.Text`
  color: white;
`;
