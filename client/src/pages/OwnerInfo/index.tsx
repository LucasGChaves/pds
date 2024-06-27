import { Button, Text } from "react-native-paper";
import LoggedAreaContainer from "../../shared/components/LoggedAreaContainer";
import styled from "styled-components/native";
import DataListWithDivider, {
  DataListValueType,
} from "../../shared/components/DataListWithDivider";

const OwnerInfo = ({ navigation }) => {
  const data: DataListValueType[] = [
    {
      leftValue: "Email",
      rightValue: "fulano@email.com",
    },
    {
      leftValue: "Telefone",
      rightValue: "(31)91434-5454",
    },
  ];

  return (
    <LoggedAreaContainer>
      <Container>
        <PhotoContainer>
          <Photo />
          <PetName>Fulanildo</PetName>
        </PhotoContainer>
        <DataListWithDivider data={data} />
      </Container>
    </LoggedAreaContainer>
  );
};

export default OwnerInfo;

const Container = styled.View`
  margin-top: 8px;
  row-gap: 32px;
  text-align: center;
`;

const PhotoContainer = styled.View`
  row-gap: 16px;
`;
const Photo = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: gray;
  margin: 0 auto;
`;

const PetName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
