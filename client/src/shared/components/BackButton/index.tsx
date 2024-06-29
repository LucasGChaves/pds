import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
interface Props {
  handleClick: () => void;
  isWhite?: boolean;
}

const BackButton = ({ handleClick, isWhite }: Props) => {
  return (
    <Container onPress={handleClick}>
      <AntDesign
        name="arrowleft"
        size={20}
        color={isWhite ? "white" : "black"}
      />
      <Text isWhite={isWhite}>Voltar</Text>
    </Container>
  );
};

export default BackButton;

const Container = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  column-gap: 2px;
  top: 15px;
  left: 15px;
  z-index: 999;
`;

interface TextProps {
  isWhite?: boolean;
}
const Text = styled.Text<TextProps>`
  color: ${(props) => (props.isWhite ? "white" : "black")};
  font-weight: bold;
`;
