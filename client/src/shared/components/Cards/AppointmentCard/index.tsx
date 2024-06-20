import styled from "styled-components/native";
import AppStyles from "../../../../styles";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CustomChip from "../CustomChip";
import OrangeBorderCardSkeleton, {
  OrangeBorderCardContent,
  OrangeBorderCardTitle,
} from "../OrangeBorderCardSkeleton";

interface Props {
  viewer: "vet" | "owner";
  pacientName: string;
  doctorName: string;
  ownerName: string;
  date: string;
  photo: string;
  handleClick: () => void;
}
const AppointmentCard = ({
  doctorName,
  pacientName,
  date,
  handleClick,
  ownerName,
  viewer,
  photo,
}: Props) => {
  return (
    <OrangeBorderCardSkeleton handleClick={handleClick} photo={photo}>
      <OrangeBorderCardContent>
        <OrangeBorderCardTitle>{pacientName}</OrangeBorderCardTitle>
        <CustomChip
          text={viewer === "owner" ? `Dr. ${doctorName}` : ownerName}
          color={viewer === "owner" ? "blue" : "green"}
          icon={<MaterialIcons name="account-circle" size={24} color="white" />}
        />
        <DateText isFinished={date.toLowerCase() === "finalizada"}>
          {date}
        </DateText>
      </OrangeBorderCardContent>
    </OrangeBorderCardSkeleton>
  );
};

export default AppointmentCard;

interface DateTextProps {
  isFinished: boolean;
}

const DateText = styled.Text<DateTextProps>`
  font-weight: bold;
  color: ${(props) =>
    props.isFinished ? AppStyles.colors.red : AppStyles.colors.green};
`;
