import styled from "styled-components/native";
import AppStyles from "../../../styles";
import CustomChip from "../CustomChip";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
interface Props {
  name: string;
  species: string;
  age: string;
  ownerName: string;
}
const PatientCard = ({ age, name, ownerName, species }: Props) => {
  return (
    <Container>
      <Photo />
      <Content>
        <Title>{name}</Title>
        <ChipsWrapper>
          <CustomChip text={species} color="blue" />
          <CustomChip text={age + " anos"} color="blue" />
          <CustomChip
            text={ownerName}
            color="orange"
            icon={
              <MaterialIcons name="account-circle" size={24} color="white" />
            }
          />
        </ChipsWrapper>
      </Content>
      <Entypo name="chevron-right" size={40} color={AppStyles.colors.primary} />
    </Container>
  );
};

export default PatientCard;

const Container = styled.View`
  border-radius: 15px;
  border-color: ${AppStyles.colors.primary30};
  border-width: 3px;
  padding: 8px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Photo = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: gray;
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 65%;
  align-items: flex-start;
`;
const Title = styled.Text`
  font-size: 16px;
`;

const ChipsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
