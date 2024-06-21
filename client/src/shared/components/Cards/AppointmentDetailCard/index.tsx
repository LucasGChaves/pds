import styled from "styled-components/native";
import AppStyles from "../../../../styles";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CustomChip from "../CustomChip";

interface Props {
  pacientName: string;
  ownerName: string;
  date: string;
  photo: string;
  handleChipClick: () => void;
}
const AppointmentDetailCard = ({
  pacientName,
  date,
  handleChipClick,
  ownerName,
  photo,
}: Props) => {
  return (
    <Container>
      <Photo />
      <Content>
        <Title>{pacientName}</Title>
        <DateText isFinished={date.toLowerCase() === "finalizada"}>
          {date}
        </DateText>
        <CustomChip
          text="Ver detalhes do pet"
          color="orange"
          handleClick={handleChipClick}
          icon={<MaterialIcons name="pets" size={24} color="white" />}
        />
        <CustomChip
          text={ownerName}
          color="green"
          icon={<MaterialIcons name="account-circle" size={24} color="white" />}
        />
      </Content>
    </Container>
  );
};

export default AppointmentDetailCard;

const Container = styled.View`
  border-radius: 15px;
  border-color: ${AppStyles.colors.primary30};
  border-width: 3px;
  padding: 6px 12px;
  display: flex;
  flex-direction: row;
  column-gap: 32px;
  align-items: center;
`;

const Photo = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: gray;
`;

const Title = styled.Text`
  font-size: 18px;
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 60%;
  align-items: flex-start;
`;

interface DateTextProps {
  isFinished: boolean;
}

const DateText = styled.Text<DateTextProps>`
  font-weight: bold;
  color: ${(props) =>
    props.isFinished ? AppStyles.colors.red : AppStyles.colors.green};
`;
