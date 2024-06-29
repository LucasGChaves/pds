import styled from "styled-components/native";
import AppStyles from "../../../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import VaccineIcon from "../../../../assets/icons/VaccineIcon";

interface Props {
  vaccineName: string;
  vetName: string;
  manufacturer: string;
  batch: string;
  handleClick(): void;
  date: Date;
}

const VaccineCard = ({
  batch,
  vetName,
  manufacturer,
  vaccineName,
  handleClick,
  date,
}: Props) => {
  return (
    <Card style={{ backgroundColor: "#fcf7f5" }}>
      <VaccineCardContainer onPress={handleClick}>
        <Content>
          <Title>{vaccineName}</Title>
          <SubTitle>
            Aplicada por Dr. {vetName} - {date.toLocaleDateString()}
          </SubTitle>
          <VaccineInfoContainer>
            <VaccineInfo>Fabricante: {manufacturer}</VaccineInfo>
            <VaccineInfo>Lote: {batch}</VaccineInfo>
          </VaccineInfoContainer>
        </Content>
        <VaccineIcon fill="black" />
      </VaccineCardContainer>
    </Card>
  );
};

export default VaccineCard;

const VaccineCardContainer = styled.TouchableOpacity`
  padding: 6px 12px;
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.View``;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0px;
`;
const SubTitle = styled.Text`
  margin-bottom: 8px;
`;

const VaccineInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  color: ${AppStyles.colors.superLightText};
`;

const VaccineInfo = styled.Text`
  color: ${AppStyles.colors.superLightText};
`;
