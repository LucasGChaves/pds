import styled from "styled-components/native";
import AppStyles from "../../../../styles";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CustomChip from "../CustomChip";
import { FontAwesome6 } from "@expo/vector-icons";
interface Props {
  petName: string;
  ownerName: string;
  vetName: string;
  date: string;
  photo: string;
  handleChipClick: () => void;
  viewerType: "vet" | "owner";
}
const AppointmentDetailsCard = ({
  petName,
  date,
  handleChipClick,
  ownerName,
  vetName,
  photo,
  viewerType,
}: Props) => {
  return (
    <Container>
      <Photo source={{ uri: photo }} />
      <Content>
        <Title>{petName}</Title>
        <DateText isFinished={date.toLowerCase() === "finalizada"}>
          {date}
        </DateText>
        <CustomChip
          text="Ver detalhes do pet"
          color="darkOrange"
          handleClick={handleChipClick}
          icon={<MaterialIcons name="pets" size={24} color="white" />}
        />
        <CustomChip
          text={viewerType === "owner" ? `Dr(a). ${vetName}` : ownerName}
          color="green"
          icon={
            viewerType === "owner" ? (
              <FontAwesome6 name="user-doctor" size={20} color="white" />
            ) : (
              <MaterialIcons name="account-circle" size={24} color="white" />
            )
          }
        />
      </Content>
    </Container>
  );
};

export default AppointmentDetailsCard;

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

const Photo = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 8px;
  background-color: ${AppStyles.colors.noPhotoGray};
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
