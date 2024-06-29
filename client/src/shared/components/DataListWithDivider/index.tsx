import { Divider } from "react-native-paper";
import styled from "styled-components/native";

export type DataListValueType = {
  leftValue: string;
  rightValue: string;
};

interface Props {
  data: DataListValueType[];
}

const DataListWithDivider = ({ data }: Props) => {
  return (
    <Container>
      {data.map((item, index) => (
        <ItemContainer key={index}>
          <TextContainer>
            <LeftText>{item.leftValue}</LeftText>
            <RightText>{item.rightValue}</RightText>
          </TextContainer>
          <Divider style={{ marginVertical: 12 }} />
        </ItemContainer>
      ))}
    </Container>
  );
};

export default DataListWithDivider;

const Container = styled.View``;

const ItemContainer = styled.View``;

const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12px;
`;

const LeftText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
const RightText = styled.Text`
  font-size: 16px;
`;
