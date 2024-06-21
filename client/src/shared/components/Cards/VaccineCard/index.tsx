import styled from "styled-components/native";
import AppStyles from "../../../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";

interface Props {
  vaccineName: string;
  doctorName: string;
  manufacturer: string;
  batch: string;
  handleClick: () => void;
}

const VaccineCard = ({
  batch,
  doctorName,
  manufacturer,
  vaccineName,
  handleClick,
}: Props) => {
  return (
    <VaccineCardContainer onPress={handleClick}>
      <Content>
        <Title>{vaccineName}</Title>
        <SubTitle>Aplicada por Dr. {doctorName}</SubTitle>
        <VaccineInfoContainer>
          <VaccineInfo>Fabricante: {manufacturer}</VaccineInfo>
          <VaccineInfo>Lote: {batch}</VaccineInfo>
        </VaccineInfoContainer>
      </Content>
      <MaterialIcons name="vaccines" size={24} color="black" />
    </VaccineCardContainer>
  );
};

export default VaccineCard;

const VaccineCardContainer = styled.TouchableOpacity`
  border-radius: 15px;
  border-color: ${AppStyles.colors.superLightText};
  border-width: 1px;
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
