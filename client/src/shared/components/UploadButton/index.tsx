import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  handleClick(): void;
}

const UploadButton = ({ handleClick }: Props) => {
  return (
    <Container
      onPress={() => {
        handleClick;
      }}
    >
      <Entypo name="arrow-with-circle-up" size={24} color="#B0770B" />
      <Text>Upload de foto</Text>
    </Container>
  );
};

export default UploadButton;

const Container = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  padding: 12px 32px;
  column-gap: 6px;
  border-color: #f5b845;
`;

const Text = styled.Text`
  color: #b0770b;
  font-size: 16px;
`;
