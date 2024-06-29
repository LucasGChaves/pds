import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import AppStyles from "../../../../styles";
interface Props {
  color: "green" | "orange" | "blue" | "darkOrange";
  icon?: React.ReactNode;
  text: string;
  handleClick?: () => void;
}
const CustomChip = ({ color, text, icon, handleClick }: Props) => {
  const getContainerColor = () => {
    switch (color) {
      case "green":
        return AppStyles.colors.lightGreen;
      case "blue":
        return AppStyles.colors.blue;
      case "orange":
        return AppStyles.colors.primary30;
      case "darkOrange":
        return AppStyles.colors.buttonPrimary;
    }
  };
  if (handleClick)
    return (
      <TouchableOpacity
        style={{ alignItems: "baseline" }}
        onPress={handleClick}
      >
        <Container color={getContainerColor()}>
          {icon && icon}
          <Content bold={Boolean(handleClick)}>{text}</Content>
        </Container>
      </TouchableOpacity>
    );

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
  padding: 3px 16px;
`;

interface ContentProps {
  bold?: boolean;
}
const Content = styled.Text<ContentProps>`
  color: white;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;
